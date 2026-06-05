using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Services
{
    public interface ICartService
    {
        Task<IEnumerable<CartItem>> GetCartAsync(string userId);
        Task AddToCartAsync(string userId, CartItem cartItem);
        Task<bool> UpdateQuantityAsync(string userId, int id, int quantity);
        Task<bool> RemoveFromCartAsync(string userId, int id);
    }

    public class CartService : ICartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItem>> GetCartAsync(string userId)
        {
            return await _context.CartItems.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task AddToCartAsync(string userId, CartItem cartItem)
        {
            cartItem.UserId = userId;
            var existing = await _context.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == cartItem.ProductId);
            
            if (existing != null)
            {
                existing.Quantity += cartItem.Quantity;
            }
            else
            {
                _context.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateQuantityAsync(string userId, int id, int quantity)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
            if (item == null) return false;

            item.Quantity = quantity;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveFromCartAsync(string userId, int id)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
            if (item == null) return false;

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
