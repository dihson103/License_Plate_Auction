namespace AccountService.Dtos.Admin
{
    public class AdminSearchResponse
    {
        public int CurrentIndex { get; set; }
        public int TotalPage { get; set; }
        public List<AdminDto> result { get; set; }
    }
}
