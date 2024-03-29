using AuctionService.Consumers;
using AuctionService.Middlewares;
using AuctionService.Repositories;
using AuctionService.Repositories.Abstract;
using AuctionService.Services;
using AuctionService.Services.Abstract;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using RedisManager;

namespace AuctionService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AuctionDbContext>(option =>
            {
                option.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddRedisManager(builder.Configuration);

            builder.Services.AddScoped<IAuctionService, AuctionsService>();
            builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();

            builder.Services.AddMassTransit(x =>
            {
                x.AddEntityFrameworkOutbox<AuctionDbContext>(o =>
                {
                    o.QueryDelay = TimeSpan.FromSeconds(10);

                    o.UsePostgres();
                    o.UseBusOutbox();
                });

                x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
                x.AddConsumersFromNamespaceContaining<AuctionDeletedFaultConsumer>();
                x.AddConsumersFromNamespaceContaining<AuctionUpdatedFaultConsumer>();
                x.AddConsumersFromNamespaceContaining<AuctionFinishedConsumer>();
                x.AddConsumersFromNamespaceContaining<BidPlacedConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction", false));

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

            builder.Services.AddHostedService<CheckAuctionStartService>();

            builder.Services.AddGrpc();

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
            app.MapGrpcService<GrpcAuctionService>();

            try
            {
                DbInitializer.InitDb(app);
            }catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            app.Run();
        }
    }
}