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

            var auction = await _auctionService.GetById(context.Message.AuctionId);
            if (context.Message.BidStatus.Contains("Accepted")
                && auction.CurrentHighBid < context.Message.Amount)
            {
                auction.CurrentHighBid = context.Message.Amount;
                await _auctionService.Update(auction);
            }
            else
            {
                Console.WriteLine("---> Consuming bid placed not update");
            }
        }
    }
}
