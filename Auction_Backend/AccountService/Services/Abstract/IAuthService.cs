using AccountService.Dtos.Admin;
using AccountService.Dtos.Auth;
using AccountService.Dtos.User;
using JwtAuthenticationManager.Models;
using System.Security.Claims;

namespace AccountService.Services.Abstract
{
    public interface IAuthService
    {
        Task<Tokens> RefreshTokenAsync(ClaimsPrincipal claimsPrincipal);
        Task LogoutAsync(ClaimsPrincipal claimsPrincipal);
        Task<AuthResponse<UserDto>> UserLoginAsync(AuthRequest authRequest);
        Task<AuthResponse<AdminDto>> AdminLoginAsync(AuthRequest authRequest);
    }
}
