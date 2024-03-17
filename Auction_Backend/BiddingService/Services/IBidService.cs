using BiddingService.Dtos;

namespace BiddingService.Services
{
    public interface IBidService
    {
        Task Bid(string userId, string fullName, BidRequest bidRequest);
        Task CheckAuctionFinished();
        Task<List<BidResponse>> GetBidsOfUser(string userId);
        Task<List<BidResponse>> GetBidsOfAuction(int auctionId);
    }
}
