using SearchService.Models;

namespace SearchService.Services
{
    public class AuctionServiceHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public AuctionServiceHttpClient(HttpClient client, IConfiguration configuration)
        {
            _httpClient = client;
            _configuration = configuration;
        }

        public async Task<List<Auction>> GetAuctionsForDb()
        {
            string auctionServiceUrl = _configuration["AuctionServiceUrl"];
            var auctions = await _httpClient.GetFromJsonAsync<List<Auction>>(auctionServiceUrl + "/api/auctions");

            return auctions;
        }
    }
}
