using AccountService.Dtos.Admin;
using AccountService.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountService.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> SearchAdmin([FromQuery] AdminSearchParam searchParam)
        {
            var result = await _adminService.Search(searchParam);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdmin([FromRoute] int id)
        {
            var admin = await _adminService.GetById(id);
            return Ok(admin);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateAdminDto adminDto)
        {
            var admin = await _adminService.Add(adminDto);
            return CreatedAtAction(nameof(GetAdmin), new { id = admin.Id }, admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAdminDto adminDto)
        {
            await _adminService.Update(id, adminDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _adminService.Delete(id);
            return Ok();
        }
    }
}
