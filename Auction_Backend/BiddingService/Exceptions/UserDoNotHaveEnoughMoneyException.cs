using System.Net;

namespace BiddingService.Exceptions
{
    public class UserDoNotHaveEnoughMoneyException : MyException
    {
        private const int StatusCode = (int)HttpStatusCode.BadRequest;
        private const string Message = "User do not have enough money to pay";
        public UserDoNotHaveEnoughMoneyException() : base(StatusCode, Message)
        {

        }
    }
}
