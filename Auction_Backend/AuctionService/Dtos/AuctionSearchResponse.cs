namespace AuctionService.Dtos
{
    public class AuctionSearchResponse
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public List<AuctionDto> Results { get; set; }
    }
}
