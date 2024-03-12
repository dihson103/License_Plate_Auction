using BiddingService.Dtos;

namespace BiddingService.Services
{
    public interface IBidService
    {
        Task Bid(string userId, BidRequest bidRequest);
    }
}
