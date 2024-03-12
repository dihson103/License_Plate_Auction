using Microsoft.EntityFrameworkCore;
using PaymentService.Dtos;
using PaymentService.Models;

namespace PaymentService.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly PaymentDbContext _context;
        public PaymentRepository(PaymentDbContext context)
        {
            _context = context;
        }

        public async Task Add(Payment payment)
        {
            _context.Payments.Add(payment); 
            await _context.SaveChangesAsync();
        }

        public async Task<List<Payment>> GetPaymentsByUserId(string userId)
        {
            return await _context.Payments
                .Where(p => p.UserId == userId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<(List<Payment> payments, int totalPages)> Search(UserGetPaymentRequest searchParams)
        {
            var query = _context.Payments.Where(p => p.UserId == searchParams.UserId);

            var totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling((double)totalItems / searchParams.PageSize);

            var payments = await query
                .OrderBy(p => p.CreateAt)
                .Skip((searchParams.PageIndex - 1) * searchParams.PageSize)
                .Take(searchParams.PageSize)
                .AsNoTracking()
                .ToListAsync(); 

            return (payments, totalPages);
        }
    }
}
