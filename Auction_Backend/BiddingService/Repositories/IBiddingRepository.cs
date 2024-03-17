using BiddingService.Models;

namespace BiddingService.Repositories
{
    public interface IBiddingRepository
    {
        Task<bool> Add(Bidding bidding);
        Task<int> GetHighestAmount(int auction);
        Task<Bidding?> GetWinBid(int auctionId);
        Task<List<Bidding>> GetBidsOfUserId(string userId);
        Task<List<Bidding>> GetBidsOfAuction(int auctionId);
    }
}
