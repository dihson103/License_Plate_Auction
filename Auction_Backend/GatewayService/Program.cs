using JwtAuthenticationManager.Extensions;
using JwtAuthenticationManager.Middlewares;
using RedisManager;

namespace GatewayService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddRedisManager(builder.Configuration);
            builder.Services.AddJwtAuthenticationManager();

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireRole("ADMIN");
                });

                options.AddPolicy("RequireAuthenticated", policy =>
                {
                    policy.RequireAuthenticatedUser();
                });
            });

            builder.Services.AddReverseProxy()
                .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

            var app = builder.Build();

            app.UseMiddleware<JwtAuthenticationMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapReverseProxy();

            app.Run();
        }
    }
}