using PaymentService.Dtos;
using PaymentService.Models;

namespace PaymentService.Repositories
{
    public interface IPaymentRepository
    {
        Task Add(Payment payment);
        Task<List<Payment>> GetPaymentsByUserId(string userId);
        Task<(List<Payment> payments, int totalPages)> Search(UserGetPaymentRequest searchRequest);
    }
}
