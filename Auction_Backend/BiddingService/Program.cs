using BiddingService.Middlewares;
using BiddingService.Models;
using BiddingService.Repositories;
using BiddingService.Services;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using RedisManager;

namespace BiddingService
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

            builder.Services.AddDbContext<BiddingDbContext>(option =>
            {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddRedisManager(builder.Configuration);

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddScoped<IBiddingRepository, BiddingRepository>();
            builder.Services.AddScoped<IBidService, BidService>();

            builder.Services.AddHostedService<CheckAuctionFinishedService>();

            builder.Services.AddScoped<GrpcAuctionClient>();
            builder.Services.AddScoped<GrpcUserClient>();

            builder.Services.AddMassTransit(x =>
            {

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bid", false));

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
                    {
                        host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
                        host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
                    });

                    cfg.ConfigureEndpoints(context);
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}