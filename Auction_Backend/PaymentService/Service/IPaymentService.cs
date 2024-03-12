using PaymentService.Dtos;

namespace PaymentService.Service
{
    public interface IPaymentService
    {
        Task Pay(string id, PaymentRequest paymentRequest);
        Task<SearchResponse> GetPaymentByUserId(string id, UserGetPaymentRequest searchRequest);
    }
}
