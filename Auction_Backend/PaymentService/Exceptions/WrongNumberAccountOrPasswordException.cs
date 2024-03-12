using System.Net;

namespace PaymentService.Exceptions
{
    public class WrongNumberAccountOrPasswordException : MyException
    {
        public WrongNumberAccountOrPasswordException() : base((int) HttpStatusCode.Unauthorized, "Wrong number account or password")
        {

        }
    }
}
