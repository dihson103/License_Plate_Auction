namespace BiddingService.Exceptions
{
    public class MyException : Exception
    {
        public int Status { get; }
        public MyException(int status, string message) : base(message)
        {
            Status = status;
        }
    }
}
