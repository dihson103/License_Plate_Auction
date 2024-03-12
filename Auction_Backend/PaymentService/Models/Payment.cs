namespace PaymentService.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int Amount { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}
