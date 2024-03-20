using Grpc.Net.Client;

namespace BiddingService.Services;

public class GrpcUserClient
{
    private readonly IConfiguration _configuration;

    public GrpcUserClient(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<GrpcUserModel?> GetUser(string userId)
    {
        Console.WriteLine("===> Calling grpc user");

        var channel = GrpcChannel.ForAddress(_configuration["GrpcUser"]);
        var client = new GrpcUser.GrpcUserClient(channel);
        var request = new GetUserRequest { Id = userId };

        try
        {
            var reply = await client.GetUserAsync(request);
            return reply.Data;
        }catch(Exception ex)
        {
            Console.WriteLine(ex.ToString());
            return null;
        }
    }
}
