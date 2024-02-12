using AccountService.Dtos.Admin;
using AccountService.Entities;
using AccountService.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace AccountService.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AccountDbContext _context;
        public AdminRepository(AccountDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Add(AdminAccount account)
        {
            _context.Admins.Add(account);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> Delete(AdminAccount account)
        {
            _context.Admins.Remove(account);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<AdminAccount> GetById(int id)
        {
            return await _context.Admins.FindAsync(id);
        }

        public async Task<bool> IsEmailExist(string email)
        {
            return await _context.Admins.AnyAsync(x => x.Email == email);   
        }

        public async Task<(List<AdminAccount>, int)> Search(AdminSearchParam searchParam)
        {
            int skip = (searchParam.PageIndex - 1) * searchParam.PageSize;

            int numberItem = await _context.Admins
                .Where(x => x.FullName.Contains(searchParam.searchValue))
                .CountAsync();

            int totalPages = (int)Math.Ceiling((double)numberItem / searchParam.PageSize);

            var result = await _context.Admins
                .Where(x => x.FullName.Contains(searchParam.searchValue))
                .OrderBy(x => x.Id)
                .Skip(skip)
                .Take(searchParam.PageSize)
                .ToListAsync();

            return (result, totalPages);
        }

        public async Task<bool> Update(AdminAccount account)
        {
            _context.Admins.Update(account);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
