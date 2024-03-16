namespace BiddingService.Dtos.Redis
{
    public class RedisAuctionDto
    {
        public int Id { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public string Status { get; set; }
        public int ReservePrice { get; set; }
    }
}
