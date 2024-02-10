using SearchService.Models;

namespace SearchService.Services.Interfaces
{
    public interface IAuctionService
    {
        Task<SearchResponse> Search(SearchParam searchParam);
        Task<Auction> GetById(int id);
        Task Add(Auction auction);
        Task Update(Auction auction);
        Task Delete(int id);
    }
}
