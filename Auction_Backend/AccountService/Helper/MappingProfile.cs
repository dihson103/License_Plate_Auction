using AccountService.Dtos.Admin;
using AccountService.Dtos.User;
using AccountService.Entities;
using AutoMapper;

namespace AccountService.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AdminAccount, AdminDto>();
            CreateMap<CreateAdminDto, AdminAccount>();

            CreateMap<UserAccount, UserDto>();
            CreateMap<CreateUserDto, UserAccount>();

        }
    }
}
