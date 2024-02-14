
using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using RedisManager;
using System.Net;
using System.Security.Claims;

namespace JwtAuthenticationManager.Attributes
{
    public class RefreshTokenAttribute : Attribute, IAsyncActionFilter
    {
        private const string REDIS_TOKEN_INFO_PREFIX = "JwtToken-";

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var tokenService = context.HttpContext.RequestServices.GetRequiredService<IJwtTokenService>();
            var redis = context.HttpContext.RequestServices.GetRequiredService<IRedisService>();

            var headerInfo = tokenService.GetTokenFromHeader(context.HttpContext);
            var token = headerInfo.Token;
            var publicKey = headerInfo.PublicKey;
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(publicKey))
            {
                context.Result = new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int) HttpStatusCode.Unauthorized
                };
                return;
            }

            try
            {
                var principal = tokenService.GetClaimsPrincipal(token, publicKey);
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    context.Result = new ContentResult
                    {
                        ContentType = "application/json",
                        StatusCode = (int)HttpStatusCode.Unauthorized
                    };
                    return;
                }

                string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
                var tokensFromRedis = await redis.GetAsync<Tokens>(redisKey);

                if (tokensFromRedis == null)
                {
                    context.Result = new ContentResult
                    {
                        ContentType = "application/json",
                        StatusCode = (int)HttpStatusCode.Unauthorized
                    };
                    return;
                }

                if (!token.Equals(tokensFromRedis.RefreshToken))
                {
                    context.Result = new ContentResult
                    {
                        ContentType = "application/json",
                        StatusCode = (int)HttpStatusCode.Unauthorized
                    };
                    return;
                }

                context.HttpContext.User = principal;

                await next();
                //var excutedContext = await next();
                //if(excutedContext.Result is OkObjectResult objectResult)
                //{
                //    await redis.SetAsync<Tokens>(redisKey, (Tokens)objectResult.Value);
                //}
            }
            catch (Exception ex)
            {
                context.Result = new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.Unauthorized
                };
                return;
            }

        }
    }
}
