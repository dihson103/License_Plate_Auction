using System.Net;

namespace BiddingService.Exceptions
{
    public class BidAmountIsTooLowException : MyException
    {
        private const int StatusCode = (int)HttpStatusCode.Conflict;
        private const string Message = "Bid amount is too low";
        public BidAmountIsTooLowException() : base(StatusCode, Message)
        {

        }
    }
}
