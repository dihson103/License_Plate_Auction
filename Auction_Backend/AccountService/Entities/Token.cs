namespace AccountService.Entities
{
    public class Token
    {
        public int Id { get; set; }
        public string JwtToken { get; set; }
        public string CurrentPrivateKey { get; set; }
        public bool IsAccescToken { get; set; }

        public UserAccount UserAccount { get; set; }
        public AdminAccount AdminAccount { get; set; }
    }
}
