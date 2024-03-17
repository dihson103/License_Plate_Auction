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

            builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
            {
                build.WithOrigins("http://localhost:3000", "http://localhost:4000").AllowAnyMethod().AllowAnyHeader();
            }));

            builder.Services.AddReverseProxy()
                .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

            var app = builder.Build();

            app.UseCors("corspolicy");

            app.UseMiddleware<JwtAuthenticationMiddleware>();

            //app.UseAuthentication();
            app.UseAuthorization();

            app.MapReverseProxy();

            app.Run();
        }
    }
}