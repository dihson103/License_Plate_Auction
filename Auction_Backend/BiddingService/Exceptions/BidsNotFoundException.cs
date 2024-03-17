using System.Net;

namespace BiddingService.Exceptions
{
    public class BidsNotFoundException : MyException
    {
        private const int StatusCode = (int)HttpStatusCode.NotFound;
        private const string Message = "Bids is not found";
        public BidsNotFoundException() : base(StatusCode, Message)
        {

        }
    }
}
