using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Services;
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
        public static IServiceCollection AddJwtAuthenticationManager(this IServiceCollection service)
        {
            service.AddSingleton<IJwtTokenService, JwtTokenService>();

            return service;
        }
    }
}
