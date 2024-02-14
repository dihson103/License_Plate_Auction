using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedisManager
{
    public static class RedisManagerExtension
    {
        public static IServiceCollection AddRedisManager(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                var connection = configuration.GetConnectionString("Redis");
                options.Configuration = connection;

            });

            services.AddSingleton<IRedisService, RedisService>();

            return services;
        }
    }
}
