using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Abstractions
{
    public interface IJwtTokenService
    {
        Task<Tokens> GenerateTokens(Claim[] claims);
        HeaderInfo GetTokenFromHeader(HttpContext context);
        ClaimsPrincipal GetClaimsPrincipal(string tokenString, string publicKeyXml);
    }
}
