using AuctionService.Dtos;
using AuctionService.Dtos.RedisDto;

namespace AuctionService.Services.Abstract
{
    public interface IAuctionService
    {
        List<AuctionDto> Get(string updateAt);
        AuctionDto GetById(int id);
        Task<AuctionDto> CreateAuction(CreateAuctionDto createAuctionDto);
        Task UpdateAuction(int id, UpdateAuctionDto updateAuctionDto);
        Task DeleteAuction(int id);
        Task<AuctionSearchResponse> SearchAuction(AuctionSearchParams searchParams);
        Task UpdateStatusOfListAuctionToLive(List<RedisAuctionDto> redisAuctionDtos);
        Task CheckAuctionStatusToChangeToLive();
    }
}
