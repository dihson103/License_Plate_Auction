namespace SearchService.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public int ReservePrice { get; set; }
        public string Winner { get; set; }
        public int? CurrentHighBid { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string Status { get; set; }

        public string LicensePlate { get; set; }
        public string KindOfCar { get; set; }
        public string LicenseType { get; set; }
        public string City { get; set; }
    }
}
