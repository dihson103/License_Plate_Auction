namespace PaymentService.Dtos;

public class PaymentRequest
{
    public string UserId { get; set; }
    public int Amount { get; set; }
    public string AccountNumber { get; set; }
    public string Password { get; set; }

}

