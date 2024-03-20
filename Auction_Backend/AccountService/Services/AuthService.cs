using AccountService.Dtos.Admin;
using AccountService.Dtos.Auth;
using AccountService.Dtos.User;
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
    public class AuthService : IAuthService
    {
        private const string REDIS_TOKEN_INFO_PREFIX = "JwtToken-";
        private readonly IRedisService _redisService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IUserRepository _userRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AuthService(
            IRedisService redisService, 
            IJwtTokenService jwtTokenService,
            IUserRepository userRepository,
            IAdminRepository adminRepository,
            IMapper mapper
            )
        {
            _jwtTokenService = jwtTokenService;
            _redisService = redisService;
            _userRepository = userRepository;
            _mapper = mapper;
            _adminRepository = adminRepository;
        }

        public async Task<AuthResponse<AdminDto>> AdminLoginAsync(AuthRequest authRequest)
        {
            var admin = await _adminRepository.GetByEmailAndPasswordAsync(authRequest.User, authRequest.Password);
            if (admin == null)
            {
                throw new MyException((int)HttpStatusCode.Unauthorized, "Wrong email or password.");
            }

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new Claim("Email", admin.Email),
                new Claim(ClaimTypes.Role, "ADMIN")
            };

            var tokens = await createTokensAsync(claims, admin.Id.ToString());

            return new AuthResponse<AdminDto>
            {
                PublicKey = tokens.PublicKey,
                AccessToken= tokens.AccessToken,
                RefreshToken = tokens.RefreshToken,
                Data = _mapper.Map<AdminDto>(admin)
            };
        }

        public async Task LogoutAsync(ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value; 

            if(string.IsNullOrEmpty(userId) )
            {
                throw new MyException((int)HttpStatusCode.Unauthorized, "User is not logged in.");
            }

            string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
            await _redisService.RemoveAsync(redisKey);
        }

        public async Task<Tokens> RefreshTokenAsync(ClaimsPrincipal claimsPrincipal)
        {
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            var tokens = await _jwtTokenService.GenerateTokens(claimsPrincipal.Claims.ToArray());

            string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
            await _redisService.RemoveAsync(redisKey);
            await _redisService.SetAsync(redisKey, tokens);

            return tokens;
        }

        public async Task<AuthResponse<UserDto>> UserLoginAsync(AuthRequest authRequest)
        {
            var user = await _userRepository.GetByIdOrEmailAsync(authRequest.User);

            if (user == null)
            {
                throw new MyException((int)HttpStatusCode.Unauthorized, "Wrong email or password.");
            }

            if(authRequest.Password != user.Password)
            {
                throw new MyException((int)HttpStatusCode.Unauthorized, "Wrong email or password.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("Email", user.Email),
                new Claim(ClaimTypes.Role, "USER"),
                new Claim("User-FullName", user.FullName)
            };

            var tokenGenerated = await createTokensAsync(claims, user.Id);

            return new AuthResponse<UserDto>
            {
                AccessToken = tokenGenerated.AccessToken,
                RefreshToken = tokenGenerated.RefreshToken,
                PublicKey = tokenGenerated.PublicKey,
                Data = _mapper.Map<UserDto>(user)
            };
        }

        private async Task<Tokens> createTokensAsync(Claim[] claims, string userId)
        {
            var tokenGenerated = await _jwtTokenService.GenerateTokens(claims);

            string redisKey = REDIS_TOKEN_INFO_PREFIX + userId;
            await _redisService.RemoveAsync(redisKey);
            await _redisService.SetAsync<Tokens>(redisKey, tokenGenerated);

            return tokenGenerated;
        }
    }
}
