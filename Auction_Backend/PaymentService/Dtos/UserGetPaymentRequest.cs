namespace PaymentService.Dtos
{
    public class UserGetPaymentRequest
    {
        public string UserId { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 4;
    }
}
