using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AuctionService.Entities
{
    [Table("Items")]
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemId { get; set; }
        [Required]
        public string LicensePlate { get; set; }
        [Required]
        public string KindOfCar { get; set; }
        [Required]
        public string LicenseType { get; set; }
        [Required]
        public string City { get; set; }

        public Auction Auction { get; set; }
        public int AuctionId { get; set; }
    }
}
