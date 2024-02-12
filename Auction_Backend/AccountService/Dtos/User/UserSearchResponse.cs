namespace AccountService.Dtos.User
{
    public class UserSearchResponse
    {
        public int CurrentIndex { get; set; }
        public int TotalPage { get; set; }
        public List<UserDto> Result { get; set; }
    }
}
