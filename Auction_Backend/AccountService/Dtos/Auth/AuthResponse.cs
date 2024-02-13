namespace AccountService.Dtos.Auth
{
    public class AuthResponse<T> 
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string PublicKey { get; set; }
        public T Data { get; set; }
    }
}
