using AutoMapper;
using Contracts;
using PaymentService.Dtos;
using PaymentService.Models;

namespace PaymentService.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Payment, PaymentResponse>();
            CreateMap<PaymentRequest, Payment>();
            CreateMap<PaymentRequest, RechargeRequested>();
        }
    }
}
