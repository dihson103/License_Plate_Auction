using AuctionService.Entities;
using AuctionService.Repositories;
using AuctionService.Repositories.Abstract;
using AuctionService.Services.Abstract;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly IAuctionRepository _auctionRepository;
        public AuctionFinishedConsumer(IAuctionRepository auctionRepository)
        {
            _auctionRepository = auctionRepository;
        }

        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            var auctionId = context.Message.AuctionId;

            Console.WriteLine("---> Consuming auction finished in auction service");

            var auction = _auctionRepository.GetById(auctionId);

            if (context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.CurrentHighBid = context.Message.Amount;
            }

            if(string.IsNullOrEmpty(auction.Winner))
            {
                auction.Status = Status.ReserveNotMet;
            }
            else
            {
                auction.Status = Status.Finished;
            }

            await _auctionRepository.UpdateAuctionAsync(auction);
        }
    }
}
