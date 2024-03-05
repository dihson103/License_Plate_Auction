using AccountService.Dtos.Auth;
using AccountService.Dtos.User;
using AccountService.Entities;
using AccountService.Exceptions;
using AccountService.Services.Abstract;
using AutoMapper;
using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
using RedisManager;
using System.Net;
using System.Security.Claims;

namespace AccountService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository userRepository, IMapper mapper
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserDto> Add(CreateUserDto userDto)
        {
            var isIdExist = await _userRepository.IsUserIdExist(userDto.Id);
            if(isIdExist)
            {
                throw new MyException((int) HttpStatusCode.BadRequest, $"User has id {userDto.Id} already exist.");
            }

            var isEmailExist = await _userRepository.IsEmailExist(userDto.Email);
            if(isEmailExist)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"User has email {userDto.Email} already exist.");
            }

            var user = _mapper.Map<UserAccount>(userDto);
            user.Status = true;
            //ramdom mat khau va ma hoa

            var result = await _userRepository.Add(user);
            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Add user account failed.");
            }

            //push event to send email

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetById(string id)
        {
            var user = await getUserById(id);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> Register(RegisterUserDto userDto)
        {
            var isIdExist = await _userRepository.IsUserIdExist(userDto.Id);
            if (isIdExist)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"User has id {userDto.Id} already exist.");
            }

            var isEmailExist = await _userRepository.IsEmailExist(userDto.Email);
            if (isEmailExist)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"User has email {userDto.Email} already exist.");
            }

            var user = _mapper.Map<UserAccount>(userDto);
            user.Status = true;
            // ma hoa mat khau

            var result = await _userRepository.Add(user);
            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Add user account failed.");
            }

            //push event to send email

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserSearchResponse> Search(UserSearchParam searchParam)
        {
            var result = await _userRepository.Search(searchParam);

            if (result.Item1.Any())
            {
                return new UserSearchResponse
                {
                    TotalPage = result.Item2,
                    CurrentIndex = searchParam.PageIndex,
                    Result = _mapper.Map<List<UserDto>>(result.Item1)
                };
            }

            throw new MyException((int)HttpStatusCode.NotFound, "Search request not found.");
        }

        public async Task UpdateUser(string id, UpdateUserRequest updateUserRequest)
        {
            var user = await getUserById(id);

            if(user.Email != updateUserRequest.Email)
            {
                var isEmailExist = await _userRepository.IsEmailExist(updateUserRequest.Email);
                if (isEmailExist)
                {
                    throw new MyException((int)HttpStatusCode.BadRequest,
                        $"User has email {updateUserRequest.Email} already exist.");
                }
            }

            if(id != updateUserRequest.Id)
            {
                var isUserIdExist = await _userRepository.IsUserIdExist(updateUserRequest.Id);
                if (isUserIdExist)
                {
                    throw new MyException((int)HttpStatusCode.BadRequest,
                            $"User has id {updateUserRequest.Id} already exist.");
                }
            }

            user.Id = updateUserRequest.Id;
            user.Email = updateUserRequest.Email;
            user.Address = updateUserRequest.Address;
            user.BirthDate = updateUserRequest.BirthDate;
            user.FullName = updateUserRequest.FullName;

            await _userRepository.Update(user);
        }

        public async Task UpdateUserEmail(string id, UpdateUserEmailDto userEmailDto)
        {
            if(id != userEmailDto.Id)
            {
                throw new MyException((int)HttpStatusCode.Conflict, "There is a confict with id");
            }

            var user = await getUserById(userEmailDto.Id);

            if(user.Email.Equals(userEmailDto.Email))
            {
                throw new MyException((int)HttpStatusCode.BadRequest, $"New email is same with old email.");
            }

            var isEmailExist = await _userRepository.IsEmailExist(userEmailDto.Email);
            if (isEmailExist)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, 
                    $"User has email {userEmailDto.Email} already exist.");
            }

            user.Email = userEmailDto.Email;

            var result = await _userRepository.Update(user);
            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest,
                    $"Update email of user has id: {userEmailDto.Id} failed.");
            }
        }

        public async Task UpdateUserStatus(string id, UpdateUserStatusDto userStatusDto)
        {
            if (id != userStatusDto.Id)
            {
                throw new MyException((int)HttpStatusCode.Conflict, "There is a confict with id");
            }

            var user = await getUserById(userStatusDto.Id);

            user.Status = userStatusDto.Status;

            var result = await _userRepository.Update(user);
            if (!result)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, 
                    $"Update status of user has id: {userStatusDto.Id} failed.");
            }
        }

        private async Task<UserAccount> getUserById(string id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
            {
                throw new MyException((int)HttpStatusCode.NotFound, $"Can not find user has id: {id}");
            }

            return user;
        }
    }
}
