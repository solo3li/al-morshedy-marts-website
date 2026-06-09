using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace BackendAPI.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<AllowedOrigin> AllowedOrigins { get; set; }
        public DbSet<SystemSetting> SystemSettings { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Seed Categories
            builder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "أجهزة المطبخ", Icon = "ChefHat", Image = "https://loremflickr.com/600/600/blender,kitchen?lock=1" },
                new Category { Id = 2, Name = "أدوات المائدة والطهي", Icon = "Utensils", Image = "https://loremflickr.com/600/600/cookware?lock=2" },
                new Category { Id = 3, Name = "أجهزة العناية الشخصية", Icon = "Sparkles", Image = "https://loremflickr.com/600/600/hairdryer?lock=3" },
                new Category { Id = 4, Name = "مكانس ومعدات تنظيف", Icon = "Wind", Image = "https://loremflickr.com/600/600/vacuum?lock=4" },
                new Category { Id = 5, Name = "تكييفات ومراوح", Icon = "Fan", Image = "https://loremflickr.com/600/600/fan,cooling?lock=5" },
                new Category { Id = 6, Name = "مكوات ودفايات", Icon = "Thermometer", Image = "https://loremflickr.com/600/600/iron,appliance?lock=6" }
            );

            // Seed Products
            builder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "عجان كهربائي احترافي 1200 وات", Brand = "Bosch", Price = 8500, OldPrice = 9500, Discount = 10, Image = "https://loremflickr.com/600/600/mixer,kitchen?lock=10", Rating = 4.8, Reviews = 124, Badge = "الأكثر مبيعاً", CategoryId = 1 },
                new Product { Id = 2, Name = "قلاية هوائية 8 لتر ديجيتال", Brand = "Philips", Price = 4200, OldPrice = 4800, Discount = 12, Image = "https://loremflickr.com/600/600/airfryer?lock=11", Rating = 4.9, Reviews = 340, CategoryId = 1 },
                new Product { Id = 3, Name = "طقم حلل جرانيت تركي 10 قطع", Brand = "Neoflam", Price = 3500, OldPrice = 4000, Discount = 12, Image = "https://loremflickr.com/600/600/cookware,pot?lock=12", Rating = 4.7, Reviews = 210, Badge = "عرض خاص", CategoryId = 2 },
                new Product { Id = 4, Name = "ماكينة حلاقة وتشذيب ذكية لاسلكية", Brand = "Braun", Price = 850, OldPrice = 1100, Discount = 22, Image = "https://loremflickr.com/600/600/shaver,beard?lock=13", Rating = 4.6, Reviews = 89, CategoryId = 3 },
                new Product { Id = 5, Name = "مكنسة كهربائية برميل 2000 وات قوة شفط عالية", Brand = "Panasonic", Price = 2900, OldPrice = null, Discount = null, Image = "https://loremflickr.com/600/600/vacuumcleaner?lock=14", Rating = 4.5, Reviews = 67, CategoryId = 4 },
                new Product { Id = 6, Name = "مروحة ستاند عمودية بشاشة تحكم ديجيتال", Brand = "Tornado", Price = 1500, OldPrice = 1800, Discount = 16, Image = "https://loremflickr.com/600/600/standfan?lock=15", Rating = 4.8, Reviews = 134, Badge = "وصل حديثاً", CategoryId = 5 },
                new Product { Id = 7, Name = "مكواة بخار لاسلكية سهلة الانزلاق", Brand = "Tefal", Price = 1100, OldPrice = 1300, Discount = 15, Image = "https://loremflickr.com/600/600/steamiron?lock=16", Rating = 4.9, Reviews = 88, CategoryId = 6 },
                new Product { Id = 8, Name = "صانعة قهوة اسبريسو وكابتشينو 15 بار", Brand = "DeLonghi", Price = 5600, OldPrice = 6200, Discount = 9, Image = "https://loremflickr.com/600/600/espresso,coffee?lock=17", Rating = 4.7, Reviews = 42, CategoryId = 1 }
            );

            // Seed Banners
            builder.Entity<Banner>().HasData(
                new Banner { Id = 1, Image = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80", Title = "عروض البلاك فرايداي", Subtitle = "خصومات تصل إلى 50% على الأجهزة المنزلية" },
                new Banner { Id = 2, Image = "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80", Title = "مهرجان التخفيضات", Subtitle = "استمتع بأقوى العروض على الإلكترونيات" }
            );

            // Seed AllowedOrigins
            builder.Entity<AllowedOrigin>().HasData(
                new AllowedOrigin { Id = 1, Url = "http://localhost:3000" }
            );

            // Seed SystemSettings
            builder.Entity<SystemSetting>().HasData(
                new SystemSetting { Key = "Cloudinary_CloudName", Value = "" },
                new SystemSetting { Key = "Cloudinary_ApiKey", Value = "" },
                new SystemSetting { Key = "Cloudinary_ApiSecret", Value = "" }
            );
        }
    }
}
