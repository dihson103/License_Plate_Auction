using Contracts;
using MassTransit;
using SearchService.Services.Interfaces;

namespace SearchService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly IAuctionService _auctionService;
        public AuctionFinishedConsumer(IAuctionService auctionService)
        {
            _auctionService = auctionService;    
        }
        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            Console.WriteLine("---> Consuming auction finished in search service");

            var auction = await _auctionService.GetById(context.Message.AuctionId);

            if (context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.CurrentHighBid = context.Message.Amount;
                auction.Status = "Finished";
            }
            else
            {
                auction.Status = "ReserveNotMet";
            }

            await _auctionService.Update(auction);
        }
    }
}
