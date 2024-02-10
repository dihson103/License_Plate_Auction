using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;

namespace AuctionService.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Auction, AuctionDto>()
                .IncludeMembers(x => x.Item)
                .ForMember(x => x.Id, o => o.MapFrom(s => s.AuctionId));
            CreateMap<Item, AuctionDto>();
            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(d => d.Item, o => o.MapFrom(s => s));
            CreateMap<CreateAuctionDto, Item>();
        }
    }
}
