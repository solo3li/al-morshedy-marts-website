using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests
{
    public class ProductsControllerTests
    {
        [Fact]
        public async Task GetProducts_ReturnsSuccessAndSeedData()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestProductsDb")
                .Options;

            using (var context = new AppDbContext(options))
            {
                context.Database.EnsureCreated(); // Seeds data
            }

            using (var context = new AppDbContext(options))
            {
                var productService = new BackendAPI.Services.ProductService(context);
                var controller = new ProductsController(productService);

                // Act
                var result = await controller.GetProducts(null);

                // Assert
                var actionResult = Assert.IsType<OkObjectResult>(result.Result);
                var products = Assert.IsAssignableFrom<IEnumerable<Product>>(actionResult.Value);
                Assert.True(products.Any());
            }
        }
    }
}
