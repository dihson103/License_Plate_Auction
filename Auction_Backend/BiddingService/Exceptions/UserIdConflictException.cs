using System.Net;

namespace BiddingService.Exceptions
{
    public class UserIdConflictException :MyException
    {
        private const int StatusCode = (int)HttpStatusCode.Conflict;
        private const string Message = "There is something wrong with userId";
        public UserIdConflictException() : base(StatusCode, Message)
        {

        }
    }
}
