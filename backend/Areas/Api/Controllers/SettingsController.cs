using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;
using BackendAPI.Models;

namespace BackendAPI.Areas.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Area("Api")]
    public class SettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SettingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("public")]
        public async Task<ActionResult<Dictionary<string, string>>> GetPublicSettings()
        {
            // Only fetch public settings (General)
            var publicKeys = new[] { 
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
                .Where(s => publicKeys.Contains(s.Key))
                .ToListAsync();

            var dict = new Dictionary<string, string>();
            
            // Set defaults to ensure keys always exist in response
            foreach (var key in publicKeys)
            {
                dict[key] = "";
            }

            // Override with DB values
            foreach (var s in settings)
            {
                dict[s.Key] = s.Value;
            }

            return Ok(dict);
        }
    }
}
