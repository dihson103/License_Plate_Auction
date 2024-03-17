using AuctionService.Dtos;
using AuctionService.Dtos.RedisDto;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.Helper;

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

        CreateMap<Auction, AuctionUpdated>()
            .IncludeMembers(x => x.Item)
            .ForMember(x => x.Id, o => o.MapFrom(s => s.AuctionId));
        CreateMap<Item, AuctionUpdated>();

        CreateMap<Auction, RedisAuctionDto>()
            .ForMember(x => x.Id, o => o.MapFrom(s => s.AuctionId));
    }
}
