using BiddingService.Dtos;
using BiddingService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BiddingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IBidService _bidService;
        public BidsController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [HttpPost]
        public async Task<IActionResult> Bid([FromBody] BidRequest bidRequest)
        {
            var userId = HttpContext.Request.Headers["User-Id"]; 
            var fullNameBase64 = HttpContext.Request.Headers["User-FullName"]; // Assuming it's base64 encoded

            // Decode the Base64-encoded full name and convert it back to UTF-8
            var fullNameBytes = System.Convert.FromBase64String(fullNameBase64);
            var fullName = System.Text.Encoding.UTF8.GetString(fullNameBytes);
            await _bidService.Bid(userId, fullName, bidRequest);
            return NoContent();
        }

        [HttpGet("{auctionId}")]
        public async Task<IActionResult> GetByAuctionId([FromRoute] int auctionId)
        {
            var result = await _bidService.GetBidsOfAuction(auctionId);
            return Ok(result);
        }
    }
}
