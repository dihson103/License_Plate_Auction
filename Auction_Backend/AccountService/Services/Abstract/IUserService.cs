using AccountService.Dtos.User;

namespace AccountService.Services.Abstract
{
    public interface IUserService
    {
        Task<UserSearchResponse> Search(UserSearchParam searchParam);
        Task<UserDto> GetById(string id);
        Task<UserDto> Add(CreateUserDto userDto);
        Task UpdateUserStatus(string id, UpdateUserStatusDto userStatusDto);
        Task UpdateUserEmail(string id, UpdateUserEmailDto userEmailDto);
    }
}
