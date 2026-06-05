using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class CategoriesController : Controller
    {
        private readonly AppDbContext _context;
        private readonly BackendAPI.Services.IImageService _imageService;

        public CategoriesController(AppDbContext context, BackendAPI.Services.IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _context.Categories.ToListAsync();
            return View(categories);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Category category, IFormFile? imageFile)
        {
            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) category.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    return View(category);
                }
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تمت إضافة القسم بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();
            return View(category);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Category category, IFormFile? imageFile)
        {
            if (id != category.Id) return NotFound();

            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) category.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    return View(category);
                }
            }

            _context.Update(category);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم التعديل بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                TempData["Success"] = "تم حذف القسم بنجاح";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
