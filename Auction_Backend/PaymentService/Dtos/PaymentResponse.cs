namespace PaymentService.Dtos
{
    public class PaymentResponse
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
