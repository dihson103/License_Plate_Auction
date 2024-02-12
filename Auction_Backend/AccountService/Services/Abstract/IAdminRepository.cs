using AccountService.Dtos.Admin;
using AccountService.Entities;

namespace AccountService.Services.Abstract
{
    public interface IAdminRepository
    {
        Task<(List<AdminAccount>, int)> Search(AdminSearchParam searchParam);
        Task<AdminAccount> GetById (int id);
        Task<bool> Delete(AdminAccount account);
        Task<bool> Add(AdminAccount account);
        Task<bool> Update(AdminAccount account);
        Task<bool> IsEmailExist(string email);
    }
}
