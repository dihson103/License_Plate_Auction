namespace PaymentService.Dtos
{
    public class SearchResponse
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public List<PaymentResponse> Results { get; set; }
    }
}
