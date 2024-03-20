using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using RedisManager;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace JwtAuthenticationManager.Middlewares
{
    public class JwtAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private const string REDIS_TOKEN_INFO_PREFIX = "JwtToken-";

        public JwtAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IRedisService redis, IJwtTokenService tokenService)
        {
            var url = context.Request.Path.ToString();
            if (url.Contains("/authentications/refresh-token"))
            {
                await _next(context);
                return;
            }

            var headerInfo = tokenService.GetTokenFromHeader(context);

            if (!headerInfo.IsNeedAuthenticate)
            {
                await _next(context);
                return;
            }

            var token = headerInfo.Token;
            var publicKey = headerInfo.PublicKey;
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(publicKey))
            {
                context.Response.StatusCode = 401;
                return;
            }

            try
            {
                var principal = tokenService.GetClaimsPrincipal(token, publicKey);
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var role = principal.FindFirst(ClaimTypes.Role)?.Value;
                var fullName = principal.FindFirst("User-FullName")?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
                var tokensFromRedis = await redis.GetAsync<Tokens>(redisKey);

                if(tokensFromRedis == null)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                if(!token.Equals(tokensFromRedis.AccessToken))
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                var fullNameBytes = Encoding.UTF8.GetBytes(fullName);
                var encodedFullName = Convert.ToBase64String(fullNameBytes);

                context.Request.Headers.Add("User-Id", userId);
                context.Request.Headers.Add("User-Role", role);
                context.Request.Headers.Add("User-FullName", encodedFullName);

                await _next(context);
            }
            catch(SecurityTokenValidationException e)
            {
                context.Response.StatusCode = 401;
                return;
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 401;
                return;
            }
        }

    }
}
