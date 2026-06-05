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
    public class ProductsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly BackendAPI.Services.IImageService _imageService;

        public ProductsController(AppDbContext context, BackendAPI.Services.IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<IActionResult> Index()
        {
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            return View(products);
        }

        public async Task<IActionResult> Create()
        {
            ViewBag.Categories = await _context.Categories.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Product product, IFormFile? imageFile)
        {
            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) product.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    ViewBag.Categories = await _context.Categories.ToListAsync();
                    return View(product);
                }
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم إضافة المنتج بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            
            ViewBag.Categories = await _context.Categories.ToListAsync();
            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Product product, IFormFile? imageFile)
        {
            if (id != product.Id) return NotFound();

            if (imageFile != null)
            {
                try
                {
                    var url = await _imageService.UploadImageAsync(imageFile);
                    if (!string.IsNullOrEmpty(url)) product.Image = url;
                }
                catch (System.Exception ex)
                {
                    ModelState.AddModelError("", "خطأ في رفع الصورة: " + ex.Message);
                    ViewBag.Categories = await _context.Categories.ToListAsync();
                    return View(product);
                }
            }

            _context.Update(product);
            await _context.SaveChangesAsync();
            TempData["Success"] = "تم تعديل المنتج بنجاح";
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                TempData["Success"] = "تم حذف المنتج بنجاح";
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
