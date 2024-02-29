using Nest;
using SearchService.Exceptions;
using SearchService.Models;
using SearchService.Services.Interfaces;
using System.Net;

namespace SearchService.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepository _repository;
        public AuctionService(IAuctionRepository repository)
        {
            _repository = repository;
        }
        public async Task Add(Auction auction)
        {
            var response = await _repository.Add(auction);

            if (!response.IsValid)
            {
                throw new MyException("Add auction to elasticsearch fail.");
            }
        }

        public async Task Delete(int id)
        {
            var response = await _repository.Delete(id);

            if (!response.IsValid)
            {
                throw new MyException("Delete auction to elasticsearch fail.");
            }
        }

        public async Task<Auction> GetById(int id)
        {
            var response = await _repository.GetById(id);

            if(!response.IsValid || response.Source == null)
            {
                throw new MyException((int) HttpStatusCode.NotFound, $"Can not found aucion has is: {id}");
            }

            return response.Source;
        }

        public async Task<SearchResponse> Search(SearchParam searchParam)
        {
            int skip = (searchParam.Page - 1) * searchParam.PageSize;

            var searchDescriptor = new SearchDescriptor<Auction>()
                .Query(q => q
                    .Bool(b => b
                        .Must(m =>
                        {
                            var conditions = new List<Func<QueryContainerDescriptor<Auction>, QueryContainer>>();
                            if (!string.IsNullOrEmpty(searchParam.LisensePlate))
                                conditions.Add(mq => mq.QueryString(qs => qs.Fields(f => f.Field(f => f.LicensePlate)).Query('*' + searchParam.LisensePlate + '*')));
                            if (!string.IsNullOrEmpty(searchParam.City))
                                conditions.Add(mq => mq.Term(t => t.Field(f => f.City.Suffix("keyword")).Value(searchParam.City)));

                            if (!string.IsNullOrEmpty(searchParam.KindOfCar))
                                conditions.Add(mq => mq.Term(m => m.Field(f => f.KindOfCar.Suffix("keyword")).Value(searchParam.KindOfCar)));

                            if (!string.IsNullOrEmpty(searchParam.LicenseType))
                                conditions.Add(mq => mq.Term(m => m.Field(f => f.LicenseType.Suffix("keyword")).Value(searchParam.LicenseType)));

                            if (!string.IsNullOrEmpty(searchParam.Status))
                                conditions.Add(mq => mq.Match(m => m.Field(f => f.Status).Query(searchParam.Status)));

                            return m.Bool(bq => bq.Must(conditions.ToArray()));
                        })
                    )
                )
                .From(skip)
                .Size(searchParam.PageSize)
                .Sort(s => s.Field(f => f.Field("id").Ascending()));

            var searchResponse = await _repository.Get(searchDescriptor);

            if (searchResponse == null || !searchResponse.IsValid)
            {
                throw new MyException((int)HttpStatusCode.BadRequest, "Response is invalid");
            }

            if (searchResponse.Documents == null || !searchResponse.Documents.Any())
            {
                throw new MyException((int)HttpStatusCode.NotFound, "Not found");
            }

            var auctions = searchResponse.Documents.ToList();

            long totalHits = searchResponse.Total;
            int totalPages = (int)Math.Ceiling((double)totalHits / searchParam.PageSize);

            var response = new SearchResponse
            {
                TotalPages = totalPages,
                CurrentPage = searchParam.Page,
                Results = auctions,
            };
            return response;
        }

        public async Task Update(Auction auction)
        {
            var response = await _repository.Update(auction);
            if(!response.IsValid)
            {
                throw new MyException("Update auction fail.");
            }
        }
    }
}
