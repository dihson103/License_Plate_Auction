using System.Net;

namespace BiddingService.Exceptions;

public class UserNotFoundException : MyException
{
    private const int StatusCode = (int)HttpStatusCode.NotFound;
    private const string Message = "User is not found";
    public UserNotFoundException() : base(StatusCode, Message)
    {

    }
}
