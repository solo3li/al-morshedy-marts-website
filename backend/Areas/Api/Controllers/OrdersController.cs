using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BackendAPI.Data;
using BackendAPI.Models;
using BackendAPI.DTOs;
using BackendAPI.Services;

namespace BackendAPI.Areas.Api.Controllers
{
    [Area("Api")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ICartService _cartService;

        public OrdersController(AppDbContext context, ICartService cartService)
        {
            _context = context;
            _cartService = cartService;
        }

        private string GetUserId() => User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();
            var cartItems = await _cartService.GetCartAsync(userId);

            if (cartItems == null || !cartItems.Any())
            {
                return BadRequest(new { message = "السلة فارغة لا يمكن إتمام الطلب." });
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                ShippingAddress = model.ShippingAddress,
                City = model.City,
                Phone = model.Phone,
                Notes = model.Notes,
                Status = "قيد المراجعة",
                TotalAmount = cartItems.Sum(c => c.Quantity * c.Product.Price),
                Items = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Price = c.Product.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Clear the cart
            await _cartService.ClearCartAsync(userId);

            return Ok(new { message = "تم إنشاء الطلب بنجاح", orderId = order.Id });
        }
    }
}
