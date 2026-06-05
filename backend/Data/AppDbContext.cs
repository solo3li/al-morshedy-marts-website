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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Seed Categories
            builder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "أجهزة منزلية", Icon = "Home", Image = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80" },
                new Category { Id = 2, Name = "إلكترونيات وموبايلات", Icon = "Smartphone", Image = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80" },
                new Category { Id = 3, Name = "سوبر ماركت", Icon = "ShoppingBasket", Image = "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80" },
                new Category { Id = 4, Name = "عناية وجمال", Icon = "Sparkles", Image = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80" },
                new Category { Id = 5, Name = "ألعاب أطفال", Icon = "Gamepad2", Image = "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=300&q=80" },
                new Category { Id = 6, Name = "أدوات مطبخ", Icon = "Utensils", Image = "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=300&q=80" }
            );

            // Seed Products
            builder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "مكواة شعر ليكسيكال LHS 5373", Brand = "Lexical", Price = 550, OldPrice = 650, Discount = 15, Image = "/images/products/hair_straightener.png", Rating = 4.8, Reviews = 124, Badge = "الأكثر مبيعاً", CategoryId = 4 },
                new Product { Id = 2, Name = "فرشاة شعر 1200وات LHD 5080", Brand = "Lexical", Price = 590, OldPrice = null, Discount = null, Image = "/images/products/electric_hair_brush.png", Rating = 4.6, Reviews = 89, CategoryId = 4 },
                new Product { Id = 3, Name = "كبة أستانلس 3 لتر 400 وات LCH 1915", Brand = "Lexical", Price = 800, OldPrice = 950, Discount = 16, Image = "/images/products/stainless_chopper.png", Rating = 4.9, Reviews = 210, Badge = "عرض خاص", CategoryId = 6 },
                new Product { Id = 4, Name = "عجان 10 لتر 2000 وات LMD 1865", Brand = "Lexical", Price = 9500, OldPrice = 10500, Discount = 10, Image = "/images/products/stand_mixer.png", Rating = 4.7, Reviews = 45, CategoryId = 6 },
                new Product { Id = 5, Name = "مكنسة برميل 25 لتر 2200 وات LVC 4002", Brand = "Lexical", Price = 3500, OldPrice = null, Discount = null, Image = "/images/products/vacuum_cleaner.png", Rating = 4.5, Reviews = 67, CategoryId = 1 },
                new Product { Id = 6, Name = "اير فراير 9 لتر 1800 وات LAF 3060", Brand = "Lexical", Price = 4600, OldPrice = 5200, Discount = 12, Image = "/images/products/air_fryer.png", Rating = 4.8, Reviews = 134, Badge = "وصل حديثاً", CategoryId = 6 },
                new Product { Id = 7, Name = "ماكينة اسبريسو 850 وات LEM 0602", Brand = "Lexical", Price = 5000, OldPrice = 5800, Discount = 14, Image = "/images/products/espresso_machine.png", Rating = 4.9, Reviews = 88, CategoryId = 6 },
                new Product { Id = 8, Name = "خلاط ومطحنة 1.5 لتر 500 وات LBL 1520", Brand = "Lexical", Price = 1000, OldPrice = 1200, Discount = 17, Image = "/images/products/glass_blender.png", Rating = 4.3, Reviews = 42, CategoryId = 6 }
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
