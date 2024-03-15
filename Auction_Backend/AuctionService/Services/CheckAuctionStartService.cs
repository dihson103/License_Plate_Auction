using AuctionService.Dtos.RedisDto;
using AuctionService.Repositories.Abstract;
using AuctionService.Services.Abstract;
using RedisManager;

namespace AuctionService.Services
{
    public class CheckAuctionStartService : BackgroundService
    {
        private readonly IServiceProvider _service;
        public CheckAuctionStartService(IServiceProvider serviceProvider)
        {
            _service = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                Console.WriteLine("---> Start check auction is started");

                stoppingToken.Register(() =>
                {
                    Console.WriteLine("---> Finish check auction is started");
                });

                while (!stoppingToken.IsCancellationRequested)
                {
                    await checkAuctionStart(stoppingToken);
                    await Task.Delay(5000, stoppingToken);
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private async Task checkAuctionStart(CancellationToken stoppingToken)
        {
            Console.WriteLine("---> Checking auction is started");
            
            using var scope = _service.CreateScope();
            var auctionService = scope.ServiceProvider.GetRequiredService<IAuctionService>();
            await auctionService.CheckAuctionStatusToChangeToLive();
        }
    }
}
