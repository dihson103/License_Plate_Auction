using AutoMapper;
using Contracts;
using MassTransit;
using Nest;
using SearchService.Models;
using SearchService.Services.Interfaces;

namespace SearchService.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        private readonly IMapper _mapper;
        private readonly IAuctionService _auctionService;
        public AuctionCreatedConsumer(IMapper mapper, IAuctionService auctionService)
        {
            _mapper = mapper;
            _auctionService = auctionService;
        }
        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("---> Consuming auction created: " + context.Message.Id);

            var auction = _mapper.Map<Auction>(context.Message);

            await _auctionService.Add(auction);
        }
    }
}
