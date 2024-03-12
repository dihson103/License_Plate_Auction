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
            //var userId = HttpContext.Request.Headers["User-Id"];
            var userId = "HE160021";
            await _bidService.Bid(userId, bidRequest);
            return NoContent();
        }
    }
}
