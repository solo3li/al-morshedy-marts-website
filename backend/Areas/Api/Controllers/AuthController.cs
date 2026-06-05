using Microsoft.AspNetCore.Mvc;
using BackendAPI.DTOs;
using BackendAPI.Services;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Area("Api")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var (succeeded, data, errors) = await _authService.RegisterAsync(model);

            if (succeeded)
            {
                return Ok(data);
            }

            return BadRequest(errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var (succeeded, data, errorMessage) = await _authService.LoginAsync(model);

            if (succeeded)
            {
                return Ok(data);
            }

            return Unauthorized(errorMessage);
        }
    }
}
