namespace SearchService.Models
{
    public class SearchParam
    {
        public string LisensePlate { get; set; }
        public string City { get; set; }
        public string KindOfCar { get; set; }
        public string LicenseType { get; set; }
        public string FilterBy { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 2;

    }
}
