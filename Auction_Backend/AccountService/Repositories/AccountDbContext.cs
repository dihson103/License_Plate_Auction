using AccountService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccountService.Repositories
{
    public class AccountDbContext : DbContext
    {
        public AccountDbContext(DbContextOptions options) : base(options) 
        {

        }

        public DbSet<UserAccount> Users { get; set; }
        public DbSet<AdminAccount> Admins { get; set; }
    }
}
