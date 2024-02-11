using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionUpdatedFaultConsumer : IConsumer<Fault<AuctionUpdated>>
    {
        public async Task Consume(ConsumeContext<Fault<AuctionUpdated>> context)
        {
            Console.Error.WriteLine("---> Consuming faulty updating auction has id: " + context.Message.Message.Id);

            //var exception = context.Message.Exceptions.First();

            // check type of exception to handle

            await Task.Delay(TimeSpan.FromMinutes(1));

            await context.Publish(context.Message.Message);
        }
    }
}
