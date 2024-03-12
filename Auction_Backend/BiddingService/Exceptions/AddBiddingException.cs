using System.Net;

namespace BiddingService.Exceptions
{
    public class AddBiddingException : MyException
    {
        private const int StatusCode = (int)HttpStatusCode.BadRequest;
        private const string Message = "Add bidding fail";
        public AddBiddingException() : base(StatusCode, Message)
        {

        }
    }
}
