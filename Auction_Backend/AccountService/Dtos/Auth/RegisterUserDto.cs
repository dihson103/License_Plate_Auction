namespace AccountService.Dtos.Auth
{
    public class RegisterUserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
    }
}
