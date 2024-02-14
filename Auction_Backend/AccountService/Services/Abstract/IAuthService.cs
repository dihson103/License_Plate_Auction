using JwtAuthenticationManager.Models;
using System.Security.Claims;

namespace AccountService.Services.Abstract
{
    public interface IAuthService
    {
        Task<Tokens> RefreshTokenAsync(ClaimsPrincipal claimsPrincipal);
    }
}
