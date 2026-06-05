using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class FavoritesController : Controller
    {
        private readonly AppDbContext _context;

        public FavoritesController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var items = await _context.Favorites.Include(f => f.Product).Include(f => f.User).ToListAsync();
            return View(items);
        }

        public async Task<IActionResult> Create()
        {
            ViewBag.Products = await _context.Products.ToListAsync();
            ViewBag.Users = await _context.Users.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Favorite favorite)
        {
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم الإضافة للمفضلة بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var fav = await _context.Favorites.FindAsync(id);
            if (fav == null) return NotFound();
            
            ViewBag.Products = await _context.Products.ToListAsync();
            ViewBag.Users = await _context.Users.ToListAsync();
            return View(fav);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Favorite favorite)
        {
            if (id != favorite.Id) return NotFound();
            
            _context.Update(favorite);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم التعديل بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var fav = await _context.Favorites.FindAsync(id);
            if (fav != null)
            {
                _context.Favorites.Remove(fav);
                await _context.SaveChangesAsync();
                TempData["Success"] = "تم الحذف بنجاح";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
