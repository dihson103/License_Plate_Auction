using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Exceptions;
using BiddingService.Models;
using BiddingService.Repositories;

namespace BiddingService.Services
{
    public class BidService : IBidService
    {
        private readonly IBiddingRepository _repository;
        private readonly IMapper _mapper;
        public BidService(IBiddingRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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
    }
}
