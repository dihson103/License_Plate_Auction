using Nest;
using SearchService.Models;

namespace SearchService.Extensions
{
    public static class ElasticSearchExtensions
    {
        public static void AddElasticSearch(
            this IServiceCollection services, IConfiguration configuration)
        {
            var url = configuration["ELKConfiguraion:Uri"];
            var defaultIndex = configuration["ELKConfiguraion:index"];

            var settings = new ConnectionSettings(new Uri(url))
                .PrettyJson()
                .DefaultIndex(defaultIndex);

            AddDefaultMappings(settings);

            var client = new ElasticClient(settings);
            services.AddSingleton<IElasticClient>(client);

            CreateIndex(client, defaultIndex);
        }

        private static void AddDefaultMappings(ConnectionSettings settings)
        {
            settings.DefaultMappingFor<Auction>(a => a);
        }

        private static void CreateIndex(IElasticClient client, string indexName)
        {
            if (!client.Indices.Exists(indexName).Exists)
            {
                client.Indices.Create(indexName, c => c
                    .Map<Auction>(m => m
                        .AutoMap()
                    )
                );
            }
        }
    }
}
