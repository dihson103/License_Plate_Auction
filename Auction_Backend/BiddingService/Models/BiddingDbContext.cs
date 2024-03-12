using Microsoft.EntityFrameworkCore;

namespace BiddingService.Models
{
    public class BiddingDbContext : DbContext
    {
        public BiddingDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Bidding> Bids { get; set; }
    }
}
