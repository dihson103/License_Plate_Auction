using AccountService.Dtos.Admin;
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
            CreateMap<UpdateAdminDto, AdminAccount>();
        }
    }
}
