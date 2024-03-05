namespace AccountService.Dtos.User
{
    public class UpdateUserRequest
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
