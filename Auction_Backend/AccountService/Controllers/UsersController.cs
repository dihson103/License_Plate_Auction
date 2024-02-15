using AccountService.Dtos.Auth;
using AccountService.Dtos.User;
using AccountService.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AccountService.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] UserSearchParam searchParam)
        {
            var result = await _userService.Search(searchParam);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var userId = HttpContext.Request.Headers["User-Id"];

            var result = await _userService.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateUserDto createUserDto)
        {
            var userDto = await _userService.Add(createUserDto);
            return CreatedAtAction(nameof(GetById), new { id = userDto.Id }, userDto);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(
            [FromRoute] string id, [FromBody] UpdateUserStatusDto updateUserStatusDto
            )
        {
            await _userService.UpdateUserStatus(id, updateUserStatusDto);
            return Ok();
        }

        [HttpPatch("{id}/email")]
        public async Task<IActionResult> UpdateUserEmail(
            [FromRoute] string id, [FromBody] UpdateUserEmailDto updateUserEmailDto
            )
        {
            await _userService.UpdateUserEmail(id, updateUserEmailDto);
            return Ok();
        }
    }
}
