using AuctionService.Dtos;

namespace AuctionService.Services.Abstract
{
    public interface IAuctionService
    {
        List<AuctionDto> GetAll();
        AuctionDto GetById(int id);
        Task<AuctionDto> CreateAuction(CreateAuctionDto createAuctionDto);
        Task UpdateAuction(int id, UpdateAuctionDto updateAuctionDto);
        Task DeleteAuction(int id);

    }
}
