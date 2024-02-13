namespace AccountService.Dtos.Auth
{
    public class TokenGenerated
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string PublicKey { get; set; }
    }
}
