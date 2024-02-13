using AccountService.Dtos.User;
using AccountService.Entities;
using AccountService.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace AccountService.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AccountDbContext _context;
        public UserRepository(AccountDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Add(UserAccount userAccount)
        {
            _context.Users.Add(userAccount);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<UserAccount> GetById(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> IsEmailExist(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);   
        }

        public async Task<bool> IsUserIdExist(string id)
        {
            return await _context.Users.AnyAsync(x => x.Id == id);
        }

        public async Task<UserAccount> LoginAsync(string username, string password)
        {
            return await _context.Users
                .Where(x => x.Id == username || x.Email == username)
                .FirstOrDefaultAsync(x => x.Password != null && x.Password == password);
        }

        public async Task<(List<UserAccount>, int)> Search(UserSearchParam searchParam)
        {
            var query = _context.Users.AsQueryable();

            // Filter by search value if provided
            if (!string.IsNullOrWhiteSpace(searchParam.SearchValue))
            {
                query = query.Where(u => u.FullName.Contains(searchParam.SearchValue));
            }

            // Filter by status
            query = query.Where(u => u.Status == searchParam.Status);

            // Sort by wallet if provided
            if (!string.IsNullOrWhiteSpace(searchParam.WalletSortType))
            {
                if (searchParam.WalletSortType == "Ascending")
                {
                    query = query.OrderBy(u => u.Wallet);
                }
                else if (searchParam.WalletSortType == "Descending")
                {
                    query = query.OrderByDescending(u => u.Wallet);
                }
            }

            var numberItem = query.Count();

            var totalPages = (int)Math.Ceiling((double)numberItem / searchParam.PageSize);

            // Apply pagination
            var result = await query.Skip((searchParam.PageIndex - 1) * searchParam.PageSize)
                                    .Take(searchParam.PageSize)
                                    .ToListAsync();

            return (result, totalPages);
        }

        public async Task<bool> Update(UserAccount userAccount)
        {
            _context.Users.Update(userAccount);
            var result = await _context.SaveChangesAsync();

            return result > 0;  
        }
    }
}
