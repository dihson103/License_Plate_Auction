namespace AccountService.Dtos.Admin
{
    public class AdminSearchParam
    {
        public string searchValue { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 4;
    }
}
