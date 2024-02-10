using Elasticsearch.Net;
using Microsoft.AspNetCore.Mvc;
using Nest;
using SearchService.Models;
using SearchService.Services.Interfaces;

namespace SearchService.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IAuctionService _auctionService;
        public SearchController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SearchParam searchParam)
        {
            var response = await _auctionService.Search(searchParam);
            return Ok(response);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _auctionService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddAuction([FromBody] Auction auction)
        {
            await _auctionService.Add(auction);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAuction([FromBody] Auction auction)
        {
            await _auctionService.Update(auction);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            await _auctionService.Delete(id);
            return Ok();
        }
    }
}
