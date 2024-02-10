using AuctionService.Entities;
using System.ComponentModel.DataAnnotations;

namespace AuctionService.Dtos
{
    public class UpdateAuctionDto
    {
        public int AuctionId { get; set; }
        [Required]
        public string LicensePlate { get; set; }
        [Required]
        public string KindOfCar { get; set; }
        [Required]
        public string LicenseType { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public Status Status { get; set; }
        [Required]
        public int ReservePrice { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
    }
}
