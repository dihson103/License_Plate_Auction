using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Repositories
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication application)
        {
            using var scope = application.Services.CreateScope();

            SeedData(scope.ServiceProvider.GetService<AuctionDbContext>());
        }

        private static void SeedData(AuctionDbContext context)
        {
            context.Database.Migrate();

            if(context.Auctions.Any())
            {
                Console.WriteLine("Already have data.");
                return;
            }

            var auctions = new List<Auction>
            {
                new Auction
                {
                    ReservePrice = 100_000_000,
                    Status = Status.Pending,
                    StartDateTime = DateTime.UtcNow,
                    EndDateTime = DateTime.UtcNow.AddDays(2),
                    Item = new Item
                    {
                        LicensePlate = "51K-993.99",
                        KindOfCar = "Xe Con",
                        LicenseType = "Tam Hoa",
                        City = "Thành phố Hồ Chí Minh"
                    }
                },
                new Auction
                {
                    ReservePrice = 40_000_000,
                    Status = Status.Pending,
                    StartDateTime = DateTime.UtcNow.AddDays(1),
                    EndDateTime = DateTime.UtcNow.AddDays(3),
                    Item = new Item
                    {
                        LicensePlate = "30K-888.88",
                        KindOfCar = "Xe Con",
                        LicenseType = "Ngũ Quý",
                        City = "Thành phố Hà Nội"
                    }
                },
                new Auction
                {
                    ReservePrice = 40_000_000,
                    Status = Status.Pending,
                    StartDateTime = DateTime.UtcNow.AddDays(1).AddHours(3),
                    EndDateTime = DateTime.UtcNow.AddDays(3),
                    Item = new Item
                    {
                        LicensePlate = "15K-200.00",
                        KindOfCar = "Xe Con",
                        LicenseType = "Tứ Quý",
                        City = "Thành phố Haỉ Phong"
                    }
                },
                new Auction
                {
                    ReservePrice = 40_000_000,
                    Status = Status.Pending,
                    StartDateTime = DateTime.UtcNow.AddDays(1),
                    EndDateTime = DateTime.UtcNow.AddDays(3),
                    Item = new Item
                    {
                        LicensePlate = "30K-897.77",
                        KindOfCar = "Xe Con",
                        LicenseType = "Tam Hoa",
                        City = "Thành phố Hà Nội"
                    }
                },
                new Auction
                {
                    ReservePrice = 40_000_000,
                    Status = Status.Pending,
                    StartDateTime = DateTime.UtcNow.AddDays(1),
                    EndDateTime = DateTime.UtcNow.AddDays(3),
                    Item = new Item
                    {
                        LicensePlate = "51K-993.99",
                        KindOfCar = "Xe Con",
                        LicenseType = "Tam Hoa",
                        City = "Thành phố Hồ Chí Minh"
                    }
                }
            };

            context.AddRange(auctions);
            context.SaveChanges();
        }
    }
}
