using Microsoft.EntityFrameworkCore;

namespace PaymentService.Models
{
    public class PaymentDbContext : DbContext
    {
        public PaymentDbContext(DbContextOptions option)
            : base(option)
        {
        }

        public DbSet<Payment> Payments { get; set; }
    }
}
