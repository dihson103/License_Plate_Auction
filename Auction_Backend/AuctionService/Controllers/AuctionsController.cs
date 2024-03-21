using AuctionService.Dtos;
using AuctionService.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Controllers
{
    [Route("api/auctions")]
    [ApiController]
    public class AuctionsController : ControllerBase
    {
        private readonly IAuctionService _auctionService;
        public AuctionsController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpGet]
        public IActionResult GetAllAuction(string updateAt)
        {
            var auctions = _auctionService.Get(updateAt);
            return Ok(auctions);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] AuctionSearchParams searchParams)
        {
            var result = await _auctionService.SearchAuction(searchParams);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetAuction([FromRoute]int id)
        {
            var auction = _auctionService.GetById(id);
            return Ok(auction);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuction([FromBody] CreateAuctionDto createAuctionDto)
        {
            var auctionDto = await _auctionService.CreateAuction(createAuctionDto);
            return CreatedAtAction(nameof(GetAuction), new { id = auctionDto.Id }, auctionDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuction([FromRoute] int id, [FromBody] UpdateAuctionDto updateAuctionDto)
        {
            await _auctionService.UpdateAuction(id, updateAuctionDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            await _auctionService.DeleteAuction(id);
            return NoContent();
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetAuctionOfWinner()
        {
            var userId = HttpContext.Request.Headers["User-Id"];
            var resutl = await _auctionService.GetAuctionsOfWinner(userId);
            return Ok(resutl);
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardInfo()
        {
            var result = await _auctionService.GetDashboardCount();
            return Ok(result);
        }


        [HttpPatch("{auctionId}")]
        public async Task<IActionResult> updateToReceived([FromRoute] int auctionId)
        {
            await _auctionService.ChangeToReceivedStatus(auctionId);
            return NoContent();
        }
    }
}
