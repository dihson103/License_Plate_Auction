using AutoMapper;
using Contracts;
using SearchService.Models;

namespace SearchService.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AuctionCreated, Auction>();
        }
    }
}
