using Nest;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Repositories
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication application)
        {
            using var scope = application.Services.CreateScope();
            var elasticClient = scope.ServiceProvider.GetService<IElasticClient>();
            var auctionClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();
            
            SeedData(elasticClient, auctionClient).Wait();
        }

        private static async Task SeedData(IElasticClient client, AuctionServiceHttpClient auctionService)
        {
            var searchResponse = client.Search<List<Auction>>(s => s
                    .Query(q => q.MatchAll())
                    .Size(1));

            if(!searchResponse.IsValid || searchResponse.Documents.Count == 0)
            {
                var auctions = await auctionService.GetAuctionsForDb();

                Console.WriteLine($"There are {auctions.Count} new auctions");

                var bulkDescriptor = new BulkDescriptor();
                foreach (var auction in auctions)
                {
                    bulkDescriptor.Index<Auction>(x => x.Document(auction));
                }

                var response = await client.BulkAsync(b => bulkDescriptor);

                if (!response.IsValid)
                {
                    throw new Exception("Error occurred while seeding data to Elasticsearch.");
                }
            }
        }
    }
}
