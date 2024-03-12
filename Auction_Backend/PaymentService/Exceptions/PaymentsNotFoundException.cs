using System.Net;

namespace PaymentService.Exceptions
{
    public class PaymentsNotFoundException : MyException
    {
        public PaymentsNotFoundException() 
            : base((int) HttpStatusCode.NotFound, $"Can not found any payments history")
        {

        }
    }
}
