using System.Net;

namespace PaymentService.Exceptions
{
    public class PaymentAmountTooLowException : MyException
    {
        public PaymentAmountTooLowException() : base((int) HttpStatusCode.BadRequest, "Payment amount is not less than 0")
        {

        }
    }
}
