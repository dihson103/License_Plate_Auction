using AccountService.Middlewares;
using AccountService.Repositories;
using AccountService.Services;
using AccountService.Services.Abstract;
using JwtAuthenticationManager.Extensions;
using Microsoft.EntityFrameworkCore;
using RedisManager;
using JwtAuthenticationManager;
using JwtAuthenticationManager.Middlewares;
using MassTransit;
using AccountService.Consumers;

namespace AccountService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AccountDbContext>(option =>
            {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddScoped<IAdminService, AdminService>();
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            builder.Services.AddRedisManager(builder.Configuration);
            builder.Services.AddJwtAuthenticationManager();

            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
            {
                build.WithOrigins("http://localhost:3000", "http://localhost:4000").AllowAnyMethod().AllowAnyHeader();
            }));

            builder.Services.AddMassTransit(x =>
            {
                x.AddConsumersFromNamespaceContaining<RechargeRequestedConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("account", false));

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.ConfigureEndpoints(context);
                });
            });

            builder.Services.AddGrpc();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("corspolicy");

            app.UseMiddleware<ExceptionMiddleware>();
            //app.UseMiddleware<JwtAuthenticationMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.MapGrpcService<GrpcUserService>();

            try
            {
                DbInitializer.InitDb(app);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            app.Run();
        }
    }
}