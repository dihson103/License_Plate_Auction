using AuctionService.Entities;

namespace AuctionService.Repositories.Abstract
{
    public interface IAuctionRepository
    {
        List<Auction> GetAll();
        Auction GetById(int id);
        bool HasAuction(int id);
        Task<bool> CreateAuctionAsync(Auction auction);
        Task<bool> UpdateAuctionAsync(Auction auction);
        Task<bool> DeleteAuctionAsync(Auction auction);
        Task<List<Auction>> GetAuctionUpdatedByUpdateDate(string updateAt);
    }
}
