using Elasticsearch.Net;
using Nest;
using SearchService.Models;
using SearchService.Services.Interfaces;

namespace SearchService.Repositories
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly IElasticClient _client;
        public AuctionRepository(IElasticClient client)
        {
            _client = client;
        }
        public async Task<IndexResponse> Add(Auction auction)
        {
            return await _client.IndexDocumentAsync(auction);
        }

        public async Task<DeleteResponse> Delete(int id)
        {
            return await _client.DeleteAsync<Auction>(id, u => u.Refresh(Refresh.WaitFor));
        }

        public async Task<ISearchResponse<Auction>> Get(SearchDescriptor<Auction> searchDescriptor)
        {
            return await _client.SearchAsync<Auction>(searchDescriptor);
        }

        public async Task<IGetResponse<Auction>> GetById(int id)
        {
            return await _client.GetAsync<Auction>(id);
        }

        public async Task<IUpdateResponse<Auction>> Update(Auction auction)
        {
            return await _client.UpdateAsync<Auction>(auction.Id, u => u.Doc(auction).Refresh(Refresh.WaitFor));
        }
    }
}
