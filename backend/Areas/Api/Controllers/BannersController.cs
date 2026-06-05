using Microsoft.AspNetCore.Mvc;
using BackendAPI.Models;
using BackendAPI.Services;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly IBannerService _bannerService;

        public BannersController(IBannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banner>>> GetBanners()
        {
            var banners = await _bannerService.GetBannersAsync();
            return Ok(banners);
        }
    }
}
