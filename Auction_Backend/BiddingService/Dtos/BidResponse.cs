namespace BiddingService.Dtos
{
    public class BidResponse
    {
        public int Id { get; set; }
        public int AuctionId { get; set; }
        public string Bidder { get; set; }
        public DateTime BidTime { get; set; }
        public int Amount { get; set; }
        public string BidderName { get; set; }
    }
}
