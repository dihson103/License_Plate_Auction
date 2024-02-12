using AccountService.Dtos.Admin;
using AccountService.Entities;
using AccountService.Exceptions;
using AccountService.Services.Abstract;
using AutoMapper;
using System.Net;

namespace AccountService.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        public AdminService(IAdminRepository adminRepository, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
        }
        public async Task<AdminDto> Add(CreateAdminDto createAdminDto)
        {
            await checkEmailExist(createAdminDto.Email);

            var admin = _mapper.Map<AdminAccount>(createAdminDto);

            var result = await _adminRepository.Add(admin);

            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Add new admin fail.");
            }

            var adminDto = _mapper.Map<AdminDto>(admin);
            return adminDto;
        }

        public async Task Delete(int id)
        {
            var admin = await getAdminById(id);

            var result = await _adminRepository.Delete(admin);

            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"Delete admin has id: {id} fail.");
            }
        }

        public async Task<AdminDto> GetById(int id)
        {
            var admin = await getAdminById(id);

            return _mapper.Map<AdminDto>(admin);
        }

        public async Task<AdminSearchResponse> Search(AdminSearchParam searchParam)
        {
            var result = await _adminRepository.Search(searchParam);

            if (result.Item1.Any())
            {
                return new AdminSearchResponse
                {
                    TotalPage = result.Item2,
                    CurrentIndex = searchParam.PageIndex,
                    result = _mapper.Map<List<AdminDto>>(result.Item1)
                };
            }

            throw new MyException((int)HttpStatusCode.NotFound, "Search Not Found.");
        }

        public async Task Update(int id, UpdateAdminDto updateAdminDto)
        {
            if(id != updateAdminDto.Id)
            {
                throw new MyException((int)HttpStatusCode.Conflict, "There is a conflict with the admin id.");
            }

            var admin = await getAdminById(id);

            if(admin.Email != updateAdminDto.Email)
            {
                await checkEmailExist(updateAdminDto.Email);
            }

            admin.Email = updateAdminDto.Email;
            admin.FullName = updateAdminDto.FullName;

            var result = await _adminRepository.Update(admin);

            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Update admin failed.");
            }
        }

        private async Task checkEmailExist(string email)
        {
            var isEmailExist = await _adminRepository.IsEmailExist(email);
            if (isEmailExist)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"Email: {email} is already exist.");
            }
        }

        private async Task<AdminAccount> getAdminById(int id)
        {
            var admin = await _adminRepository.GetById(id);

            if (admin == null)
            {
                throw new MyException((int)HttpStatusCode.NotFound, $"Admin with id: {id} not found.");
            }

            return admin;
        }
    }
}
