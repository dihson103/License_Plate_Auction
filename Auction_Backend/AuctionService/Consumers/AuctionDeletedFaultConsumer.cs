using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionDeletedFaultConsumer : IConsumer<Fault<AuctionDeleted>>
    {
        public async Task Consume(ConsumeContext<Fault<AuctionDeleted>> context)
        {
            Console.Error.WriteLine("---> Consuming faulty deleting auction has id " + context.Message.Message.Id);

            //var exception = context.Message.Exceptions.First();

            // check type of exception to handle

            await Task.Delay(TimeSpan.FromMinutes(1));

            await context.Publish(context.Message.Message);
        }
    }
}
