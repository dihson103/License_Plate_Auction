using AuctionService.Dtos;
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
        Task<int> GetNewIdInserted();
        Task<(List<Auction> Auctions, int TotalPages)> SearchAuction(AuctionSearchParams searchParams);
        Task UpdateListAuctionAsync(List<Auction> auctions);
        Task<Auction> GetByIdAsync(int id);
        Task<List<Auction>> GetStartLiveListAsync();
        Task<bool> IsLisensePlateExist(string lisensePlate);
        Task<List<Auction>> GetAuctionsOfWinner(string winner);
        Task<int> GetNumberLiving();
        Task<int> GetNumberFinished();
        Task<int> GetTotalMoney();
    }
}
