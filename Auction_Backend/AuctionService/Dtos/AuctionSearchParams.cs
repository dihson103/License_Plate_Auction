using AuctionService.Entities;

namespace AuctionService.Dtos
{
    public class AuctionSearchParams
    {
        public string SearchTerm { get; set; }
        public Status Status { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 4;

    }
}
