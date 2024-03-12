using System.Net;

namespace PaymentService.Exceptions
{
    public class UserIdConflictException : MyException
    {

        public UserIdConflictException() : base((int)HttpStatusCode.Conflict, "UserId is wrong")
        {

        }

    }
}
