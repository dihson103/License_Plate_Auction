using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers
{
    public class RechargeRequestedConsumer : IConsumer<RechargeRequested>
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public RechargeRequestedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task Consume(ConsumeContext<RechargeRequested> context)
        {
            Console.WriteLine("===> reveiced payment notification");

            await _hubContext.Clients.All.SendAsync($"Payment-success", context.Message);
        }
    }
}
