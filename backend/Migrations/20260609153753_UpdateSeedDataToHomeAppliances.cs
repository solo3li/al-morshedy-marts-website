using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedDataToHomeAppliances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AllowedOrigins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowedOrigins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    ShippingAddress = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SystemSettings",
                columns: table => new
                {
                    Key = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemSettings", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AllowedOrigins",
                columns: new[] { "Id", "Url" },
                values: new object[] { 1, "http://localhost:3000" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "ChefHat", "https://loremflickr.com/600/600/blender,kitchen?lock=1", "أجهزة المطبخ" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Utensils", "https://loremflickr.com/600/600/cookware?lock=2", "أدوات المائدة والطهي" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Sparkles", "https://loremflickr.com/600/600/hairdryer?lock=3", "أجهزة العناية الشخصية" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Wind", "https://loremflickr.com/600/600/vacuum?lock=4", "مكانس ومعدات تنظيف" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Fan", "https://loremflickr.com/600/600/fan,cooling?lock=5", "تكييفات ومراوح" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Thermometer", "https://loremflickr.com/600/600/iron,appliance?lock=6", "مكوات ودفايات" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Bosch", 1, 10, "https://loremflickr.com/600/600/mixer,kitchen?lock=10", "عجان كهربائي احترافي 1200 وات", 9500m, 8500m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating", "Reviews" },
                values: new object[] { "Philips", 1, 12, "https://loremflickr.com/600/600/airfryer?lock=11", "قلاية هوائية 8 لتر ديجيتال", 4800m, 4200m, 4.9000000000000004, 340 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating" },
                values: new object[] { "Neoflam", 2, 12, "https://loremflickr.com/600/600/cookware,pot?lock=12", "طقم حلل جرانيت تركي 10 قطع", 4000m, 3500m, 4.7000000000000002 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating", "Reviews" },
                values: new object[] { "Braun", 3, 22, "https://loremflickr.com/600/600/shaver,beard?lock=13", "ماكينة حلاقة وتشذيب ذكية لاسلكية", 1100m, 850m, 4.5999999999999996, 89 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Brand", "CategoryId", "Image", "Name", "Price" },
                values: new object[] { "Panasonic", 4, "https://loremflickr.com/600/600/vacuumcleaner?lock=14", "مكنسة كهربائية برميل 2000 وات قوة شفط عالية", 2900m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Tornado", 5, 16, "https://loremflickr.com/600/600/standfan?lock=15", "مروحة ستاند عمودية بشاشة تحكم ديجيتال", 1800m, 1500m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Brand", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Tefal", 15, "https://loremflickr.com/600/600/steamiron?lock=16", "مكواة بخار لاسلكية سهلة الانزلاق", 1300m, 1100m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating" },
                values: new object[] { "DeLonghi", 1, 9, "https://loremflickr.com/600/600/espresso,coffee?lock=17", "صانعة قهوة اسبريسو وكابتشينو 15 بار", 6200m, 5600m, 4.7000000000000002 });

            migrationBuilder.InsertData(
                table: "SystemSettings",
                columns: new[] { "Key", "Value" },
                values: new object[,]
                {
                    { "Cloudinary_ApiKey", "" },
                    { "Cloudinary_ApiSecret", "" },
                    { "Cloudinary_CloudName", "" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllowedOrigins");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "SystemSettings");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Home", "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80", "أجهزة منزلية" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Smartphone", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80", "إلكترونيات وموبايلات" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "ShoppingBasket", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80", "سوبر ماركت" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Sparkles", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80", "عناية وجمال" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Gamepad2", "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=300&q=80", "ألعاب أطفال" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Icon", "Image", "Name" },
                values: new object[] { "Utensils", "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=300&q=80", "أدوات مطبخ" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Lexical", 4, 15, "/images/products/hair_straightener.png", "مكواة شعر ليكسيكال LHS 5373", 650m, 550m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating", "Reviews" },
                values: new object[] { "Lexical", 4, null, "/images/products/electric_hair_brush.png", "فرشاة شعر 1200وات LHD 5080", null, 590m, 4.5999999999999996, 89 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating" },
                values: new object[] { "Lexical", 6, 16, "/images/products/stainless_chopper.png", "كبة أستانلس 3 لتر 400 وات LCH 1915", 950m, 800m, 4.9000000000000004 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating", "Reviews" },
                values: new object[] { "Lexical", 6, 10, "/images/products/stand_mixer.png", "عجان 10 لتر 2000 وات LMD 1865", 10500m, 9500m, 4.7000000000000002, 45 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Brand", "CategoryId", "Image", "Name", "Price" },
                values: new object[] { "Lexical", 1, "/images/products/vacuum_cleaner.png", "مكنسة برميل 25 لتر 2200 وات LVC 4002", 3500m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Lexical", 6, 12, "/images/products/air_fryer.png", "اير فراير 9 لتر 1800 وات LAF 3060", 5200m, 4600m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Brand", "Discount", "Image", "Name", "OldPrice", "Price" },
                values: new object[] { "Lexical", 14, "/images/products/espresso_machine.png", "ماكينة اسبريسو 850 وات LEM 0602", 5800m, 5000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Brand", "CategoryId", "Discount", "Image", "Name", "OldPrice", "Price", "Rating" },
                values: new object[] { "Lexical", 6, 17, "/images/products/glass_blender.png", "خلاط ومطحنة 1.5 لتر 500 وات LBL 1520", 1200m, 1000m, 4.2999999999999998 });
        }
    }
}
