namespace BiddingService.Dtos
{
    public class BidRequest
    {
        public string UserId { get; set; }
        public int AuctionId { get; set; }
        public int BidAmount { get; set; }
    }
}
