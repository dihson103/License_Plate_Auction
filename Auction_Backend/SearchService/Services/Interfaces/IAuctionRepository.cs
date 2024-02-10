using Nest;
using SearchService.Models;
using System.Net;

namespace SearchService.Services.Interfaces
{
    public interface IAuctionRepository
    {
        Task<ISearchResponse<Auction>> Get(SearchDescriptor<Auction> searchDescriptor);
        Task<IGetResponse<Auction>> GetById(int id);
        Task<IndexResponse> Add(Auction auction);
        Task<IUpdateResponse<Auction>> Update(Auction auction);
        Task<DeleteResponse> Delete(int id);
    }
}
