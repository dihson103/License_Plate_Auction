using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Dtos;
using PaymentService.Service;

namespace PaymentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] UserGetPaymentRequest searchRequest)
        {
            //var userId = HttpContext.Request.Headers["User-Id"];
            var userId = "HE160021";

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _paymentService.GetPaymentByUserId(userId, searchRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Pay([FromBody] PaymentRequest paymentRequest)
        {
            //var userId = HttpContext.Request.Headers["User-Id"];
            var userId = "HE160021";

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            await _paymentService.Pay(userId, paymentRequest);
            return NoContent();
        }
    }
}
