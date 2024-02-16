using AuctionService.Repositories.Abstract;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly IAuctionRepository _auctionRepository;
        public BidPlacedConsumer(IAuctionRepository auctionRepository)
        {
            _auctionRepository = auctionRepository;
        }
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            var auctionId = context.Message.Id;

            Console.WriteLine($"---> Consuming bid placed in auction service");

            var auction = _auctionRepository.GetById( auctionId );

            if(context.Message.BidStatus.Contains("Accepted") 
                && auction.CurrentHighBid < context.Message.Amount)
            {
                auction.CurrentHighBid = context.Message.Amount;
                await _auctionRepository.UpdateAuctionAsync(auction);
            }
            else
            {
                Console.WriteLine("---> Consuming bid placed not update");
            }
        }
    }
}
