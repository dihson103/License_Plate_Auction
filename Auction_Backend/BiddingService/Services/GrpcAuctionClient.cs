using BiddingService.Dtos.Redis;
using Grpc.Net.Client;

namespace BiddingService.Services
{
    public class GrpcAuctionClient
    {
        private readonly IConfiguration _configuration;

        public GrpcAuctionClient(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public RedisAuctionDto? GetAuction(int id)
        {
            Console.WriteLine("===> Calling grpc auction");

            var channel = GrpcChannel.ForAddress(_configuration["GrpcAuction"]);
            var client = new GrpcAuction.GrpcAuctionClient(channel);
            var request = new GetAuctionRequest { Id = id };

            try
            {
                var reply = client.GetAuction(request);
                var auction = new RedisAuctionDto
                {
                    Id = reply.Data.Id,
                    StartDateTime = DateTime.Parse(reply.Data.StartDateTime),
                    EndDateTime = DateTime.Parse(reply.Data.EndDateTime),
                    Status = reply.Data.Status,
                    ReservePrice = reply.Data.ReservePrice
                };

                return auction;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }
}
