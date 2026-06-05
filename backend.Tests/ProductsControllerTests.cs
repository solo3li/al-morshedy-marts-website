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
                var controller = new ProductsController(context);

                // Act
                var result = await controller.GetProducts(null);

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<Product>>>(result);
                var products = Assert.IsAssignableFrom<IEnumerable<Product>>(actionResult.Value);
                Assert.True(products.Any());
            }
        }
    }
}
