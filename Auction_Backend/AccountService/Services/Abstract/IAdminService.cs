using AccountService.Dtos.Admin;

namespace AccountService.Services.Abstract
{
    public interface IAdminService
    {
        Task<AdminSearchResponse> Search(AdminSearchParam searchParam);
        Task<AdminDto> GetById(int id);
        Task<AdminDto> Add(CreateAdminDto createAdminDto);
        Task Delete(int id);
        Task Update(int id, UpdateAdminDto updateAdminDto);
    }
}
