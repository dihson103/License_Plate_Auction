using AccountService.Dtos.Auth;
using AccountService.Services.Abstract;
using JwtAuthenticationManager.Attributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountService.Controllers
{
    [Route("api/authentications")]
    [ApiController]
    public class AuthenticationsController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthenticationsController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> UserLogin([FromBody] AuthRequest authRequest)
        {
            var result = await _authService.UserLoginAsync(authRequest);
            return Ok(result);
        }

        [HttpPost("admin")]
        public async Task<IActionResult> AdminLogin([FromBody] AuthRequest authRequest)
        {
            var result = await _authService.AdminLoginAsync(authRequest);
            return Ok(result);
        }

        [HttpPost("refresh-token")]
        [RefreshToken]
        public async Task<IActionResult> RefreshToken()
        {
            var user = HttpContext.User;

            var tokens = await _authService.RefreshTokenAsync(user);

            return Ok(tokens);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var user = HttpContext.User;
            await _authService.LogoutAsync(user);

            return Ok();
        }
    }
}
