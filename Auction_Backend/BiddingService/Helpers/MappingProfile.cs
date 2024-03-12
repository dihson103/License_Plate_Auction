using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Models;

namespace BiddingService.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BidRequest, Bidding>();
        }
    }
}
