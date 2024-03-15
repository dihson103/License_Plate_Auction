using AuctionService.Dtos;
using AuctionService.Dtos.RedisDto;
using AuctionService.Entities;
using AuctionService.Exceptions;
using AuctionService.Repositories.Abstract;
using AuctionService.Services.Abstract;
using AutoMapper;
using Contracts;
using MassTransit;
using MassTransit.Transports;
using RedisManager;
using System.Net;

namespace AuctionService.Services
{
    public class AuctionsService : IAuctionService
    {
        private const string PENDING_AUCTION_KEY = "Pending-auction-list";

        private readonly IAuctionRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly IRedisService _redisService;

        public AuctionsService(
            IAuctionRepository repository, 
            IMapper mapper, 
            IPublishEndpoint publishEndpoint,
            IRedisService redisService
            )
        {
            _repository = repository;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
            _redisService = redisService;
        }

        public async Task<AuctionDto> CreateAuction(CreateAuctionDto createAuctionDto)
        {
            var auction = _mapper.Map<Auction>(createAuctionDto);

            var newId = await _repository.GetNewIdInserted();
            auction.AuctionId = newId;

            var auctionDto = _mapper.Map<AuctionDto>(auction);
            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(auctionDto));

            var isSuccess = await _repository.CreateAuctionAsync(auction);

            await addPendingAuctionToRedis(auction);

            if (!isSuccess)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Create auction failed.");
            }

            return auctionDto;
        }

        public async Task DeleteAuction(int id)
        {
            var auction = _repository.GetById(id);

            if(auction == null)
            {
                throw new MyException((int)HttpStatusCode.NotFound, $"Can not found auction has id: {id}");
            }

            if(auction.Status != Status.InActive && auction.Status != Status.Pending)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "This auction is was used.");
            }

            await _publishEndpoint.Publish(new AuctionDeleted { Id = id });

            var isSuccess = await _repository.DeleteAuctionAsync(auction);
            if(!isSuccess)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Delete auction fail.");
            }
        }

        public List<AuctionDto> Get(string updateAt)
        {
            List<Auction> auctions = null;

            if(updateAt != null)
            {
                auctions = _repository.GetAuctionUpdatedByUpdateDate(updateAt).Result;
            }
            else
            {
                auctions = _repository.GetAll();
            }

            if (auctions.Any())
            {
                return _mapper.Map<List<AuctionDto>>(auctions);
            }

            throw new MyException((int)HttpStatusCode.NotFound, "Not found any auctions.");
        }

        public AuctionDto GetById(int id)
        {
            var isAuctionExist = _repository.HasAuction(id);

            if(isAuctionExist)
            {
                var auction = _repository.GetById(id);
                return _mapper.Map<AuctionDto>(auction);
            }

            throw new MyException((int)HttpStatusCode.NotFound, $"Not found auction has id: {id}.");
        }

        public async Task<AuctionSearchResponse> SearchAuction(AuctionSearchParams searchParams)
        {
            var result = await _repository.SearchAuction(searchParams);

            var totalPages = result.TotalPages;
            var auctions = result.Auctions;

            if(auctions.Count <= 0)
            {
                throw new MyException((int)HttpStatusCode.NotFound, $"Search auction is not found");
            }

            return new AuctionSearchResponse
            {
                TotalPages = totalPages,
                CurrentPage = searchParams.PageIndex,
                Results = _mapper.Map<List<AuctionDto>>(auctions)
            };
        }

        public async Task UpdateAuction(int id, UpdateAuctionDto updateAuctionDto)
        {
            if(id != updateAuctionDto.AuctionId)
            {
                throw new MyException((int)HttpStatusCode.Conflict, "There are something conflict with auctionId.");
            }

            var isAuctionExist = _repository.HasAuction(id);
            if(!isAuctionExist)
            {
                throw new MyException((int)HttpStatusCode.NotFound, $"Can not find auction has id: {id}");
            }

            var auction = _repository.GetById(id);

            auction.Item.LicensePlate = updateAuctionDto.LicensePlate;
            auction.Item.KindOfCar = updateAuctionDto.KindOfCar;
            auction.Item.LicenseType = updateAuctionDto.LicenseType;
            auction.Item.City = updateAuctionDto.City;
            auction.Status = updateAuctionDto.Status;
            auction.ReservePrice = updateAuctionDto.ReservePrice;
            auction.UpdateAt = DateTime.UtcNow;
            
            if(auction.Status != Status.InActive)
            {
                auction.StartDateTime = updateAuctionDto.StartDateTime;
                auction.EndDateTime = updateAuctionDto.EndDateTime;
            }
            else
            {
                auction.StartDateTime = null;
                auction.EndDateTime = null;
            }

            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

            var isSuccess = await _repository.UpdateAuctionAsync(auction);
            if (!isSuccess)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Update auction fail.");
            }
            await updateAuctionStatusToRedis(auction);
        }

        private async Task addPendingAuctionToRedis(Auction auction)
        {
            var redisAuction = _mapper.Map<RedisAuctionDto>(auction);
            var pendingList = await _redisService.GetAsync<List<RedisAuctionDto>>(PENDING_AUCTION_KEY);
            if (pendingList != null)
            {
                var isAuctionExist = pendingList.Any(x => x.Id == auction.AuctionId);
                if(!isAuctionExist)
                {
                    pendingList.Add(redisAuction);
                }
            }
            else
            {
                pendingList = new List<RedisAuctionDto> { redisAuction };
            }
            await _redisService.SetAsync(PENDING_AUCTION_KEY, pendingList);
        }

        private async Task deletePendingAuctionFromRedis(int auctionId)
        {
            var pendingList = await _redisService.GetAsync<List<RedisAuctionDto>>(PENDING_AUCTION_KEY);
            if(pendingList != null)
            {
                var redisAuction = pendingList.SingleOrDefault(x => x.Id == auctionId);
                pendingList.Remove(redisAuction);
            }
            await _redisService.SetAsync(PENDING_AUCTION_KEY, pendingList);
        }

        private async Task updateAuctionStatusToRedis(Auction auction)
        {
            if(auction.Status == Status.Pending)
            {
                await addPendingAuctionToRedis(auction);
            }
            else if(auction.Status == Status.InActive)
            {
                await deletePendingAuctionFromRedis(auction.AuctionId);
            }
        }
    }
}
