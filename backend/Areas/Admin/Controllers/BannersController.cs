using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class BannersController : Controller
    {
        private readonly AppDbContext _context;
        private readonly BackendAPI.Services.IImageService _imageService;

        public BannersController(AppDbContext context, BackendAPI.Services.IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Banners.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Banner banner, IFormFile? imageFile)
        {
            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) banner.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    return View(banner);
                }
            }

            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم إضافة البانر بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null) return NotFound();
            return View(banner);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Banner banner, IFormFile? imageFile)
        {
            if (id != banner.Id) return NotFound();

            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) banner.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    return View(banner);
                }
            }

            _context.Update(banner);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم التعديل بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner != null)
            {
                _context.Banners.Remove(banner);
                await _context.SaveChangesAsync();
                TempData["Success"] = "تم החذف بنجاح";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
