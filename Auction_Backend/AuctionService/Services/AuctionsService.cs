using AuctionService.Dtos;
using AuctionService.Entities;
using AuctionService.Exceptions;
using AuctionService.Repositories.Abstract;
using AuctionService.Services.Abstract;
using AutoMapper;
using Contracts;
using MassTransit;
using MassTransit.Transports;
using System.Net;

namespace AuctionService.Services
{
    public class AuctionsService : IAuctionService
    {
        private readonly IAuctionRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        public AuctionsService(
            IAuctionRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint
            )
        {
            _repository = repository;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        public async Task<AuctionDto> CreateAuction(CreateAuctionDto createAuctionDto)
        {
            var auction = _mapper.Map<Auction>(createAuctionDto);

            var newId = await _repository.GetNewIdInserted();
            auction.AuctionId = newId;

            var auctionDto = _mapper.Map<AuctionDto>(auction);
            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(auctionDto));

            var isSuccess = await _repository.CreateAuctionAsync(auction);

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

            var isSuccess = await _repository.UpdateAuctionAsync(auction);
            if (!isSuccess)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Update auction fail.");
            }
        }
    }
}
