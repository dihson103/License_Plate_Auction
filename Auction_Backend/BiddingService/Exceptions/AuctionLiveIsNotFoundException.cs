using System.Net;

namespace BiddingService.Exceptions
{
    public class AuctionLiveIsNotFoundException : MyException
    {
        private const int StatusCode = (int)HttpStatusCode.NotFound;
        private const string Message = "Auction is not found";
        public AuctionLiveIsNotFoundException() : base(StatusCode, Message)
        {
        }
    }
}
