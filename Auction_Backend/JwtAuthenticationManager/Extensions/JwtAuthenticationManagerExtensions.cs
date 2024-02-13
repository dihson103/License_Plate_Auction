using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Extensions
{
    public static class JwtAuthenticationManagerExtensions
    {
        public static IServiceCollection AddJwtAuthenticationManager(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddStackExchangeRedisCache(options =>
            {
                var connection = configuration.GetConnectionString("Redis");
                options.Configuration = connection;

            });

            service.AddSingleton<IJwtTokenService, JwtTokenService>();

            return service;
        }
    }
}
