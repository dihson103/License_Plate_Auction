namespace BiddingService.Services
{
    public class CheckAuctionFinishedService : BackgroundService
    {
        private readonly IServiceProvider _service;

        public CheckAuctionFinishedService(IServiceProvider service)
        {
            _service = service;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                Console.WriteLine("---> Start checking auction finished");

                stoppingToken.Register(() =>
                {
                    Console.WriteLine("---> Finish checking auction is finished");
                });

                while (!stoppingToken.IsCancellationRequested)
                {
                    await checkAuctionFinished(stoppingToken);
                    await Task.Delay(5000, stoppingToken);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private async Task checkAuctionFinished(CancellationToken stoppingToken)
        {
            Console.WriteLine("---> Checking auction is finished");

            using var scope = _service.CreateScope();
            var bidService = scope.ServiceProvider.GetRequiredService<IBidService>();
            await bidService.CheckAuctionFinished();
        }
    }
}
