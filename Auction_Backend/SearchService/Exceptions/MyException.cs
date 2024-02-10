namespace SearchService.Exceptions
{
    public class MyException : Exception
    {
        public int StatusCode { get; }

        public MyException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        public MyException(string message) : base(message) { }
    }
}
