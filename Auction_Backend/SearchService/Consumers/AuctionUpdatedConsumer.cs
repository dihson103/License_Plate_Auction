using AutoMapper;
using Contracts;
using MassTransit;
using Nest;
using SearchService.Models;
using SearchService.Services.Interfaces;

namespace SearchService.Consumers
{
    public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
    {
        private readonly IAuctionService _auctionService;
        private readonly IMapper _mapper;
        public AuctionUpdatedConsumer(IAuctionService auctionService, IMapper mapper)
        {
            _auctionService = auctionService;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<AuctionUpdated> context)
        {
            Console.WriteLine("---> Consuming auction updated has id: " + context.Message.Id);

            var auction = _mapper.Map<Auction>(context.Message);

            await _auctionService.Update(auction);
        }
    }
}
