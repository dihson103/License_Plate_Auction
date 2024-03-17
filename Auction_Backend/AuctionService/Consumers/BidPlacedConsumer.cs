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
            var bidPlaced = context.Message;

            Console.WriteLine($"---> Consuming bid placed in auction service");

            var auction = _auctionRepository.GetById( bidPlaced.AuctionId );

            var currentHighest = auction.CurrentHighBid ?? 0;
            if (currentHighest < bidPlaced.Amount)
            {
                auction.CurrentHighBid = bidPlaced.Amount;
                await _auctionRepository.UpdateAuctionAsync(auction);
            }
            else
            {
                Console.WriteLine("---> Consuming bid placed not update");
            }
        }
    }
}
