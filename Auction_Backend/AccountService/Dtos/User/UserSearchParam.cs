namespace AccountService.Dtos.User
{
    public class UserSearchParam
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 4;
        public string SearchValue { get; set; }
        public string WalletSortType { get; set; }
        public bool Status { get; set; }
    }
}
