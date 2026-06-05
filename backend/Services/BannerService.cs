using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Services
{
    public interface IBannerService
    {
        Task<IEnumerable<Banner>> GetBannersAsync();
    }

    public class BannerService : IBannerService
    {
        private readonly AppDbContext _context;

        public BannerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Banner>> GetBannersAsync()
        {
            return await _context.Banners.ToListAsync();
        }
    }
}
