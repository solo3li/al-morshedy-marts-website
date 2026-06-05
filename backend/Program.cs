using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// DbContext & Failsafe
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
bool usePostgres = false;
bool connectionFailed = false;

if (!string.IsNullOrEmpty(connectionString) && !connectionString.Equals("InMemory", StringComparison.OrdinalIgnoreCase))
{
    try
    {
        // Try to connect before setting up EF Core
        using var conn = new Npgsql.NpgsqlConnection(connectionString);
        conn.Open(); 
        usePostgres = true; 
    }
    catch (System.Exception)
    {
        // Connection failed! Fallback to InMemory
        usePostgres = false;
        connectionFailed = true;
    }
}

builder.Services.AddSingleton(new BackendAPI.Models.DatabaseState { IsPostgres = usePostgres, ConnectionFailed = connectionFailed });

builder.Services.AddDbContext<AppDbContext>(options => {
    if (usePostgres) {
        options.UseNpgsql(connectionString);
    } else {
        options.UseInMemoryDatabase("EshakTestDb");
    }
});

// Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!))
    };
});

// Configure Application Cookie for Admin Panel
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Admin/Auth/Login";
    options.AccessDeniedPath = "/Admin/Auth/AccessDenied";
});

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBannerService, BannerService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IFavoriteService, FavoriteService>();

builder.Services.AddScoped<BackendAPI.Services.IImageService, BackendAPI.Services.CloudinaryImageService>();

// Controllers & CORS
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => BackendAPI.Models.CorsConfig.AllowedOrigins.Contains(origin))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
app.MapControllers();

// Seed data for InMemoryDatabase
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();

    // Create Admin User
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    if (userManager.FindByEmailAsync("admin@eshak.com").Result == null)
    {
        var admin = new ApplicationUser { UserName = "admin@eshak.com", Email = "admin@eshak.com", FullName = "Admin User" };
        userManager.CreateAsync(admin, "Admin123!").Wait();
    }

    if (!context.Products.Any())
    {
        context.Categories.Add(new BackendAPI.Models.Category { Name = "أجهزة منزلية", Icon = "Home", Image = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80" });
        context.SaveChanges();
        
        var catId = context.Categories.First().Id;
        context.Products.AddRange(
            new BackendAPI.Models.Product { Name = "عجانة كهربائية", Brand = "Kenwood", Price = 4999, Rating = 4.8, Reviews = 120, Image = "/images/products/stand_mixer.png", CategoryId = catId },
            new BackendAPI.Models.Product { Name = "مكنسة كهربائية", Brand = "Samsung", Price = 3500, Rating = 4.5, Reviews = 80, Image = "/images/products/vacuum_cleaner.png", CategoryId = catId }
        );
        context.Banners.Add(new BackendAPI.Models.Banner { Title = "عروض الصيف", Subtitle = "خصومات تصل إلى 50%", Image = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80" });
        context.SaveChanges();
    }

    // Load Origins into Cache
    var origins = context.AllowedOrigins.Select(o => o.Url).ToList();
    foreach (var origin in origins)
    {
        BackendAPI.Models.CorsConfig.AllowedOrigins.Add(origin);
    }
}

app.Run();

public partial class Program { }
