using BiddingService.Models;
using Microsoft.EntityFrameworkCore;

namespace BiddingService.Repositories
{
    public class BiddingRepository : IBiddingRepository
    {
        private readonly BiddingDbContext _context;
        public BiddingRepository(BiddingDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Add(Bidding bidding)
        {
            _context.Bids.Add(bidding);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<int> GetHighestAmount(int auction)
        {
            var highestBid = await _context.Bids
                                        .Where(x => x.AuctionId == auction)
                                        .MaxAsync(x => x.BidAmount);
            return highestBid;
        }
    }
}
