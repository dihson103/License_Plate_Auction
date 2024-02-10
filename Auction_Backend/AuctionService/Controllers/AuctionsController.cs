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
        public IActionResult GetAllAuction()
        {
            var auctions = _auctionService.GetAll();
            return Ok(auctions);
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
            return CreatedAtAction(nameof(GetAuction), new { id = auctionDto.AuctionId }, auctionDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuction([FromRoute] int id, [FromBody] UpdateAuctionDto updateAuctionDto)
        {
            await _auctionService.UpdateAuction(id, updateAuctionDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            await _auctionService.DeleteAuction(id);
            return Ok();
        }
    }
}
