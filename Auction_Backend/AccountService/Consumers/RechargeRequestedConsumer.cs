using AccountService.Services.Abstract;
using Contracts;
using MassTransit;

namespace AccountService.Consumers
{
    public class RechargeRequestedConsumer : IConsumer<RechargeRequested>
    {
        private readonly IUserService _userService;
        public RechargeRequestedConsumer(IUserService userService)
        {
            _userService = userService;
        }

        public async Task Consume(ConsumeContext<RechargeRequested> context)
        {
            await _userService.Recharge(context.Message);
        }
    }
}
