using Contracts;
using MassTransit;
using SearchService.Services.Interfaces;

namespace SearchService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly IAuctionService _auctionService;
        public BidPlacedConsumer(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("---> Consumimg bid placed in search service");

            var bidPlaced = context.Message;

            var auction = await _auctionService.GetById(bidPlaced.AuctionId);
            var currentHighest = auction.CurrentHighBid ?? 0;
            if (currentHighest < bidPlaced.Amount)
            {
                auction.CurrentHighBid = bidPlaced.Amount;
                await _auctionService.Update(auction);
            }
            else
            {
                Console.WriteLine("---> Consuming bid placed not update");
            }
        }
    }
}
