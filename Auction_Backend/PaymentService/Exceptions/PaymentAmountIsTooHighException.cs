using System.Net;

namespace PaymentService.Exceptions
{
    public class PaymentAmountIsTooHighException : MyException
    {
        public PaymentAmountIsTooHighException() : base((int) HttpStatusCode.BadRequest, "Payment amount is too high")
        {

        }
    }
}
