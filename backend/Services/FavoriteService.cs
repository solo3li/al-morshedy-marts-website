using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Services
{
    public interface IFavoriteService
    {
        Task<IEnumerable<Favorite>> GetFavoritesAsync(string userId);
        Task AddFavoriteAsync(string userId, int productId);
        Task<bool> RemoveFavoriteAsync(string userId, int productId);
    }

    public class FavoriteService : IFavoriteService
    {
        private readonly AppDbContext _context;

        public FavoriteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Favorite>> GetFavoritesAsync(string userId)
        {
            return await _context.Favorites.Include(f => f.Product).Where(f => f.UserId == userId).ToListAsync();
        }

        public async Task AddFavoriteAsync(string userId, int productId)
        {
            var existing = await _context.Favorites.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);
            
            if (existing == null)
            {
                _context.Favorites.Add(new Favorite { UserId = userId, ProductId = productId });
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> RemoveFavoriteAsync(string userId, int productId)
        {
            var favorite = await _context.Favorites.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);
            if (favorite == null) return false;

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
