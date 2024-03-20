using AccountService.Services.Abstract;
using Grpc.Core;

namespace AccountService.Services;

public class GrpcUserService : GrpcUser.GrpcUserBase
{
    private readonly IUserRepository _userRepository;

    public GrpcUserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public override async Task<GrpcUserResponse> GetUser(
        GetUserRequest userRequest, ServerCallContext context
        )
    {
        Console.WriteLine("+++> Received grpc get user request");

        var user = await _userRepository.GetById(userRequest.Id) ??
            throw new RpcException(new Status(StatusCode.NotFound, "User is not found"));

        var response = new GrpcUserResponse
        {
            Data = new GrpcUserModel
            {
                Id = user.Id,
                Wallet= user.Wallet,
                Status= user.Status,
            }
        };

        return response;
    }
}
