using BiddingService.Models;

namespace BiddingService.Repositories
{
    public interface IBiddingRepository
    {
        Task<bool> Add(Bidding bidding);
        Task<int> GetHighestAmount(int auction);
        Task<Bidding?> GetWinBid(int auctionId);
    }
}
