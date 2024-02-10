namespace SearchService.Models
{
    public class SearchResponse
    {
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public List<Auction> Results { get; set; }
    }
}
