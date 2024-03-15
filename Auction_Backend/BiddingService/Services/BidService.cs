using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Dtos.Redis;
using BiddingService.Exceptions;
using BiddingService.Models;
using BiddingService.Repositories;
using Contracts;
using MassTransit;
using RedisManager;

namespace BiddingService.Services;

public class BidService : IBidService
{
    private const string LIVE_AUCTION_KEY = "Living-auction-list";

    private readonly IBiddingRepository _repository;
    private readonly IMapper _mapper;
    private readonly IRedisService _redisService;
    private readonly IPublishEndpoint _publishEndpoint;
    public BidService(
        IBiddingRepository repository,  
        IMapper mapper, 
        IRedisService redisService,
        IPublishEndpoint publishEndpoint
        )
    {
        _repository = repository;
        _mapper = mapper;
        _redisService = redisService;
        _publishEndpoint = publishEndpoint;
    }

    public async Task Bid(string userId, BidRequest bidRequest)
    {
        if(userId != bidRequest.UserId)
        {
            throw new UserIdConflictException();
        }

        await checkAuctionValid(bidRequest.AuctionId);

        await checkBidAmountValid(bidRequest);

        var bidding = _mapper.Map<Bidding>(bidRequest);

        var result = await _repository.Add(bidding);

        if (!result)
        {
            throw new AddBiddingException();
        }
    }

    private async Task checkBidAmountValid(BidRequest bidRequest)
    {
        var highestAmount = await _repository.GetHighestAmount(bidRequest.AuctionId);
        
        if(bidRequest.BidAmount <= highestAmount)
        {
            throw new BidAmountIsTooLowException();
        }
    }

    private async Task checkAuctionValid(int auctionId)
    {
        //call to auction service by grpc to check auction is live or not
    }

    public async Task CheckAuctionFinished()
    {
        var livingList = await GetAuctionLivingListFromRedis();

        if(livingList == null || livingList.Count <= 0)
        {
            return;
        }

        var currentDate = DateTime.UtcNow;
        var finishedList = livingList.Where(x => x.EndDateTime >= currentDate).ToList();

        if(finishedList == null || finishedList.Count <= 0)
        {
            return;
        }

        var pushAuctionFinishEventToAuctionServiceTask = PushAuctionFinishEventToAuctionService(finishedList);
        var removeFinishedAuctionFromRedisTask = RemoveFinishedAuctionFromRedis(livingList, finishedList);

        await Task.WhenAll(pushAuctionFinishEventToAuctionServiceTask, removeFinishedAuctionFromRedisTask);
    }

    private async Task<List<RedisAuctionDto>?> GetAuctionLivingListFromRedis()
    {
        var auctions = await _redisService.GetAsync<List<RedisAuctionDto>>(LIVE_AUCTION_KEY);
        return auctions;
    }

    private async Task PushAuctionFinishEventToAuctionService(List<RedisAuctionDto> finishedList)
    {
        foreach (var auction in finishedList)
        {
            var bidWin = await _repository.GetWinBid(auction.Id);
            var auctionFinished = new AuctionFinished
            {
                ItemSold = bidWin != null,
                AuctionId = auction.Id,
                Amount = bidWin?.BidAmount ?? 0,
                Winner = bidWin?.UserId ?? ""
            };
            await _publishEndpoint.Publish<AuctionFinished>(auctionFinished);
        }
    }

    private async Task RemoveFinishedAuctionFromRedis(
        List<RedisAuctionDto> livingList, List<RedisAuctionDto> finishedList
        )
    {
        livingList.RemoveAll(x => finishedList.Any(a => a.Id == x.Id));
        await _redisService.SetAsync(LIVE_AUCTION_KEY, livingList);
    }
}
