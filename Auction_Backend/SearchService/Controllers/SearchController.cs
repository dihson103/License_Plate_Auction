using Elasticsearch.Net;
using Microsoft.AspNetCore.Mvc;
using Nest;
using SearchService.Models;

namespace SearchService.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IElasticClient _client;
        public SearchController(IElasticClient elasticClient)
        {
            _client = elasticClient;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SearchParam searchParam)
        {
            // Calculate the number of documents to skip based on the page number and page size
            int skip = (searchParam.Page - 1) * searchParam.PageSize;

            var searchDescriptor = new SearchDescriptor<Auction>()
                .Query(q => q
                    .Bool(b => b
                        .Must(m =>
                        {
                            // Add search conditions based on the provided parameters
                            var conditions = new List<Func<QueryContainerDescriptor<Auction>, QueryContainer>>();
                            if (!string.IsNullOrEmpty(searchParam.LisensePlate))
                                conditions.Add(mq => mq.QueryString(qs => qs.Query('*' + searchParam.LisensePlate + '*')));
                            if (!string.IsNullOrEmpty(searchParam.City))
                                conditions.Add(mq => mq.Match(m => m.Field(f => f.City).Query(searchParam.City)));
                            if (!string.IsNullOrEmpty(searchParam.KindOfCar))
                                conditions.Add(mq => mq.Match(m => m.Field(f => f.KindOfCar).Query(searchParam.KindOfCar)));
                            if (!string.IsNullOrEmpty(searchParam.LicenseType))
                                conditions.Add(mq => mq.Match(m => m.Field(f => f.LicenseType).Query(searchParam.LicenseType)));

                            // Combine all conditions with 'must' operator
                            return m.Bool(bq => bq.Must(conditions.ToArray()));
                        })
                    )
                )
                .From(skip) // Number of documents to skip
                .Size(searchParam.PageSize); // Number of documents to return per page

            var searchResponse = await _client.SearchAsync<Auction>(searchDescriptor);

            if (!searchResponse.IsValid)
            {
                return BadRequest("Failed to fetch auctions");
            }

            // Extract the documents from the search response
            var auctions = searchResponse.Documents.ToList();

            // Calculate the total number of pages
            long totalHits = searchResponse.Total;
            int totalPages = (int)Math.Ceiling((double)totalHits / searchParam.PageSize);

            // Create a custom response object to include both search results and total pages
            var response = new
            {
                TotalPages = totalPages,
                CurrentPage = searchParam.Page,
                Results = auctions
            };

            return Ok(response);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _client.GetAsync<Auction>(id);

            if(response.IsValid && response.Found)
            {
                return Ok(response.Source);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddAuction([FromBody] Auction auction)
        {
            var response = await _client.IndexDocumentAsync(auction);

            if(response.IsValid)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAuction([FromBody] Auction auction)
        {
            var response = await _client.UpdateAsync<Auction>(auction.Id, u => u.Doc(auction).Refresh(Refresh.WaitFor));
            
            if (response.IsValid)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            var response = await _client.DeleteAsync<Auction>(id, u => u.Refresh(Refresh.WaitFor));
            
            if(response.IsValid)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
