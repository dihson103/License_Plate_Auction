using MassTransit;
using SearchService.Consumers;
using SearchService.Extensions;
using SearchService.MiddleWares;
using SearchService.Repositories;
using SearchService.Services;
using SearchService.Services.Interfaces;

namespace SearchService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            builder.Services.AddElasticSearch(builder.Configuration);
            builder.Services.AddHttpClient<AuctionServiceHttpClient>();

            builder.Services.AddScoped<IAuctionService, AuctionService>();
            builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();

            builder.Services.AddMassTransit(x =>
            {
                x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.ConfigureEndpoints(context);
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseAuthorization();

            app.MapControllers();

            try
            {
                DbInitializer.InitDb(app);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            app.Run();
        }
    }
}