using Contracts;
using MassTransit;
using SearchService.Services.Interfaces;

namespace SearchService.Consumers
{
    public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
    {
        private readonly IAuctionService _auctionService;
        public AuctionDeletedConsumer(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }
        public async Task Consume(ConsumeContext<AuctionDeleted> context)
        {
            Console.WriteLine("---> Consuming auction deleted " + context.Message.Id);

            await _auctionService.Delete(context.Message.Id);
        }
    }
}
