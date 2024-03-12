using AutoMapper;
using Contracts;
using MassTransit;
using PaymentService.Dtos;
using PaymentService.Exceptions;
using PaymentService.Models;
using PaymentService.Repositories;

namespace PaymentService.Service
{
    public class PaymenttService : IPaymentService
    {
        private const string ACCOUNT_NUMBER = "0976099351";
        private const string ACCOUNT_PASSWORD = "dihson103";
        private const int MAX_AMOUNT = 100_000_000;

        private readonly IPaymentRepository _paymentRepository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public PaymenttService(
            IPaymentRepository paymentRepository, IMapper mapper, IPublishEndpoint publishEndpoint
            )
        {
            _paymentRepository = paymentRepository;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        public async Task<SearchResponse> GetPaymentByUserId(string id, UserGetPaymentRequest searchRequest)
        {
            if(id != searchRequest.UserId)
            {
                throw new UserIdConflictException();
            }

            var result = await _paymentRepository.Search(searchRequest);

            if(result.payments is null)
            {
                throw new PaymentsNotFoundException();
            }

            return new SearchResponse
            {
                PageIndex = searchRequest.PageIndex,
                TotalPages = result.totalPages,
                Results = _mapper.Map<List<PaymentResponse>>(result.payments)
            };
        }

        public async Task Pay(string id, PaymentRequest paymentRequest)
        {
            try
            {
                if(id != paymentRequest.UserId)
                {
                    throw new UserIdConflictException();
                }

                //await Task.Delay(TimeSpan.FromMinutes(1));

                if(paymentRequest.Amount <= 0)
                {
                    throw new PaymentAmountTooLowException();
                }

                if(paymentRequest.Amount > MAX_AMOUNT)
                {
                    throw new PaymentAmountIsTooHighException();
                }

                if(paymentRequest.AccountNumber != ACCOUNT_NUMBER || paymentRequest.Password != ACCOUNT_PASSWORD)
                {
                    throw new WrongNumberAccountOrPasswordException();
                }

                // push new recharge event to accountservice
                var rechargeRequest = _mapper.Map<RechargeRequested>(paymentRequest);
                await _publishEndpoint.Publish(rechargeRequest);

                var payment = _mapper.Map<Payment>(paymentRequest);
                await _paymentRepository.Add(payment);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                // push new error recharge event to notification service
            }
        }
    }
}
