namespace BiddingService.Models
{
    public class Bidding
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
        public int AuctionId { get; set; }
        public int BidAmount { get; set; }
        public DateTime BidAt { get; set; } = DateTime.UtcNow;
    }
}
