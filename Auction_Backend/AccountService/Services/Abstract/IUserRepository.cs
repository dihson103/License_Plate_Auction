using AccountService.Dtos.User;
using AccountService.Entities;

namespace AccountService.Services.Abstract
{
    public interface IUserRepository
    {
        Task<(List<UserAccount>, int)> Search(UserSearchParam searchParam);
        Task<UserAccount> GetById(string id);
        Task<bool> Add(UserAccount userAccount);
        Task<bool> Update(UserAccount userAccount);
        Task<bool> IsEmailExist(string email);
        Task<bool> IsUserIdExist(string id);
        Task<UserAccount> LoginAsync(string username, string password);
    }
}
