namespace AccountService.Dtos.User
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public double Wallet { get; set; }
        public bool Status { get; set; }
    }
}
