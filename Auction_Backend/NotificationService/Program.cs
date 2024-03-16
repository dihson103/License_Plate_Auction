using MassTransit;
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

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("notification", false));

                x.UsingRabbitMq((context, cfg) =>
                {
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