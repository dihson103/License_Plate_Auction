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
        public async Task<IActionResult> Get(string keyword)
        {
            var results = await _client.SearchAsync<Auction>(
                s => s.Query(
                    q => q.QueryString(
                        d => d.Query('*'+keyword+'*')
                    )
                 ).Size(100)
             ); 

            return Ok(results.Documents.ToList());
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
