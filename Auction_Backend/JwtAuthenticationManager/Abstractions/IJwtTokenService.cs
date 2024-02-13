using JwtAuthenticationManager.Models;
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
        Tokens GenerateTokens(Claim[] claims);
    }
}
