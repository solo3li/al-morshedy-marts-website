using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class SettingsController : Controller
    {
        private readonly AppDbContext _context;

        public SettingsController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Origins()
        {
            var origins = await _context.AllowedOrigins.ToListAsync();
            return View(origins);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrigin(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                TempData["Error"] = "الرابط لا يمكن أن يكون فارغاً";
                return RedirectToAction(nameof(Origins));
            }

            url = url.TrimEnd('/'); // Clean trailing slash

            if (!await _context.AllowedOrigins.AnyAsync(o => o.Url == url))
            {
                var origin = new AllowedOrigin { Url = url };
                _context.AllowedOrigins.Add(origin);
                await _context.SaveChangesAsync();
                
                // Update Cache
                CorsConfig.AllowedOrigins.Add(url);
                
                TempData["Success"] = "تم إضافة الرابط بنجاح. سيتم تفعيله فوراً!";
            }
            else
            {
                TempData["Error"] = "الرابط موجود مسبقاً!";
            }

            return RedirectToAction(nameof(Origins));
        }

        public async Task<IActionResult> DeleteOrigin(int id)
        {
            var origin = await _context.AllowedOrigins.FindAsync(id);
            if (origin != null)
            {
                _context.AllowedOrigins.Remove(origin);
                await _context.SaveChangesAsync();
                
                // Update Cache
                CorsConfig.AllowedOrigins.Remove(origin.Url);
                
                TempData["Success"] = "تم حذف الرابط بنجاح والمواقع لن تستطيع الاتصال بعد الآن.";
            }
            return RedirectToAction(nameof(Origins));
        }
    }
}
