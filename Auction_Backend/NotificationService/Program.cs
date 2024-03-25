using MassTransit;
using NotificationService.Consumers;
using NotificationService.Hubs;

namespace NotificationService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddMassTransit(x =>
            {
                x.AddConsumersFromNamespaceContaining<BidPlacedConsumer>();
                x.AddConsumersFromNamespaceContaining<RechargeRequestedConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("notification", false));

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

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.MapHub<NotificationHub>("/notifications");

            app.Run();
        }
    }
}