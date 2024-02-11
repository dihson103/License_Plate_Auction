using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

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
            CreateMap<AuctionDto, AuctionCreated>();

            CreateMap<Auction, AuctionCreated>()
                .IncludeMembers(x => x.Item)
                .ForMember(x => x.Id, o => o.MapFrom(s => s.AuctionId));
            CreateMap<Item, AuctionCreated>();
        }
    }
}
