using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Models;
using Contracts;

namespace BiddingService.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BidRequest, Bidding>();

            CreateMap<Bidding, BidPlaced>()
                .ForMember(x => x.Bidder, o => o.MapFrom(b => b.UserId))
                .ForMember(x => x.BidderName, o => o.MapFrom(b => b.FullName))
                .ForMember(x => x.Amount, o => o.MapFrom(b => b.BidAmount))
                .ForMember(x => x.BidTime, o => o.MapFrom(b => b.BidAt));

            CreateMap<Bidding, BidResponse>()
                .ForMember(x => x.Bidder, o => o.MapFrom(b => b.UserId))
                .ForMember(x => x.BidderName, o => o.MapFrom(b => b.FullName))
                .ForMember(x => x.Amount, o => o.MapFrom(b => b.BidAmount))
                .ForMember(x => x.BidTime, o => o.MapFrom(b => b.BidAt));
        }
    }
}
