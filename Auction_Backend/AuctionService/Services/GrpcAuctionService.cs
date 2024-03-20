using AuctionService.Repositories.Abstract;
using AuctionService.Services.Abstract;
using Grpc.Core;

namespace AuctionService.Services;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
    private readonly IAuctionRepository _auctionRepository;

    public GrpcAuctionService(IAuctionRepository auctionRepository)
    {
        _auctionRepository = auctionRepository;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(
        GetAuctionRequest request, ServerCallContext context
        )
    {
        Console.WriteLine("+++> Received grpc get auction request");

        var auction = await _auctionRepository.GetByIdAsync(request.Id) 
            ?? throw new RpcException(new Status(StatusCode.NotFound, "Auction is not found"));

        var response = new GrpcAuctionResponse
        {
            Data = new GrpcAuctionModel
            {
                Id = auction.AuctionId,
                EndDateTime = auction.EndDateTime.ToString(),
                StartDateTime = auction.StartDateTime.ToString(),
                ReservePrice = auction.ReservePrice
            }
        };

        return response;    
    }
}
