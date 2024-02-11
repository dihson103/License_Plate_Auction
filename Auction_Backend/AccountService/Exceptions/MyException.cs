namespace AccountService.Exceptions
{
    public class MyException : Exception
    {
        public int StatusCode { get; }
        public MyException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
