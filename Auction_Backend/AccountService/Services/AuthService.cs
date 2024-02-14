using AccountService.Services.Abstract;
using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
using RedisManager;
using System.Security.Claims;

namespace AccountService.Services
{
    public class AuthService : IAuthService
    {
        private const string REDIS_TOKEN_INFO_PREFIX = "JwtToken-";
        private readonly IRedisService _redisService;
        private readonly IJwtTokenService _jwtTokenService;
        public AuthService(IRedisService redisService, IJwtTokenService jwtTokenService)
        {
            _jwtTokenService = jwtTokenService;
            _redisService = redisService;
        }
        public async Task<Tokens> RefreshTokenAsync(ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            var tokens = await _jwtTokenService.GenerateTokens(claimsPrincipal.Claims.ToArray());

            string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
            await _redisService.RemoveAsync(redisKey);
            await _redisService.SetAsync(redisKey, tokens);

            return tokens;
        }
    }
}
