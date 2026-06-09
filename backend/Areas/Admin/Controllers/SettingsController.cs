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

        public async Task<IActionResult> Cloudinary()
        {
            var settings = await _context.SystemSettings
                .Where(s => s.Key.StartsWith("Cloudinary_"))
                .ToListAsync();

            var model = new Dictionary<string, string>();
            foreach(var s in settings)
            {
                model[s.Key] = s.Value;
            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateCloudinary(string cloudName, string apiKey, string apiSecret)
        {
            var cn = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_CloudName");
            if (cn != null) cn.Value = cloudName ?? "";

            var ak = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_ApiKey");
            if (ak != null) ak.Value = apiKey ?? "";

            var @as = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_ApiSecret");
            if (@as != null) @as.Value = apiSecret ?? "";

            await _context.SaveChangesAsync();
            
            TempData["Success"] = "تم تحديث إعدادات Cloudinary بنجاح.";
            return RedirectToAction(nameof(Cloudinary));
        }

        public async Task<IActionResult> Database([FromServices] BackendAPI.Models.DatabaseState dbState)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            var jsonString = await System.IO.File.ReadAllTextAsync(filePath);
            var jsonNode = System.Text.Json.Nodes.JsonNode.Parse(jsonString);
            
            var connectionString = jsonNode?["ConnectionStrings"]?["DefaultConnection"]?.ToString() ?? "";
            
            ViewBag.DbState = dbState;
            return View((object)connectionString);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDatabase(string connectionString)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            var jsonString = await System.IO.File.ReadAllTextAsync(filePath);
            var jsonNode = System.Text.Json.Nodes.JsonNode.Parse(jsonString);

            if (jsonNode?["ConnectionStrings"] != null)
            {
                jsonNode["ConnectionStrings"]!["DefaultConnection"] = connectionString;
            }
            else
            {
                jsonNode!["ConnectionStrings"] = new System.Text.Json.Nodes.JsonObject
                {
                    ["DefaultConnection"] = connectionString
                };
            }

            // Using JsonSerializerOptions for pretty print
            var options = new System.Text.Json.JsonSerializerOptions { WriteIndented = true };
            await System.IO.File.WriteAllTextAsync(filePath, jsonNode.ToJsonString(options));

            TempData["Success"] = "تم تحديث اتصال قاعدة البيانات بنجاح! سيتم إعادة تشغيل النظام لتطبيق التغييرات.";
            
            // Note: modifying appsettings.json usually reloads IConfiguration, but for DbContext it's best to restart.
            // We could programmatically trigger a restart, but for now we rely on the host reacting or manual restart.
            return RedirectToAction(nameof(Database));
        }

        public async Task<IActionResult> Brevo()
        {
            var settings = await _context.SystemSettings
                .Where(s => s.Key.StartsWith("Brevo_"))
                .ToListAsync();

            var model = new Dictionary<string, string>();
            foreach(var s in settings)
            {
                model[s.Key] = s.Value;
            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateBrevo(string apiKey, string senderEmail, string senderName)
        {
            var ak = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_ApiKey");
            if (ak != null) ak.Value = apiKey ?? "";
            else _context.SystemSettings.Add(new SystemSetting { Key = "Brevo_ApiKey", Value = apiKey ?? "" });

            var se = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_SenderEmail");
            if (se != null) se.Value = senderEmail ?? "";
            else _context.SystemSettings.Add(new SystemSetting { Key = "Brevo_SenderEmail", Value = senderEmail ?? "" });

            var sn = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_SenderName");
            if (sn != null) sn.Value = senderName ?? "";
            else _context.SystemSettings.Add(new SystemSetting { Key = "Brevo_SenderName", Value = senderName ?? "" });

            await _context.SaveChangesAsync();
            
            TempData["Success"] = "تم تحديث إعدادات إرسال الإيميلات (Brevo) بنجاح.";
            return RedirectToAction(nameof(Brevo));
        }

        public async Task<IActionResult> General()
        {
            var keys = new[] { 
                "General_AboutUs", 
                "General_ContactPhone", 
                "General_ContactEmail", 
                "General_ContactAddress",
                "General_SocialFacebook",
                "General_SocialWhatsapp",
                "General_SocialInstagram",
                "General_SocialMessenger"
            };

            var settings = await _context.SystemSettings
                .Where(s => keys.Contains(s.Key))
                .ToListAsync();

            var model = new Dictionary<string, string>();
            foreach(var key in keys) model[key] = ""; // Default empty
            foreach(var s in settings) model[s.Key] = s.Value;

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateGeneral(
            string aboutUs, string contactPhone, string contactEmail, string contactAddress,
            string socialFacebook, string socialWhatsapp, string socialInstagram, string socialMessenger)
        {
            var dict = new Dictionary<string, string>
            {
                { "General_AboutUs", aboutUs ?? "" },
                { "General_ContactPhone", contactPhone ?? "" },
                { "General_ContactEmail", contactEmail ?? "" },
                { "General_ContactAddress", contactAddress ?? "" },
                { "General_SocialFacebook", socialFacebook ?? "" },
                { "General_SocialWhatsapp", socialWhatsapp ?? "" },
                { "General_SocialInstagram", socialInstagram ?? "" },
                { "General_SocialMessenger", socialMessenger ?? "" }
            };

            foreach(var kv in dict)
            {
                var setting = await _context.SystemSettings.FirstOrDefaultAsync(s => s.Key == kv.Key);
                if (setting != null)
                {
                    setting.Value = kv.Value;
                }
                else
                {
                    _context.SystemSettings.Add(new SystemSetting { Key = kv.Key, Value = kv.Value });
                }
            }

            await _context.SaveChangesAsync();
            
            TempData["Success"] = "تم تحديث الإعدادات العامة بنجاح.";
            return RedirectToAction(nameof(General));
        }
    }
}
