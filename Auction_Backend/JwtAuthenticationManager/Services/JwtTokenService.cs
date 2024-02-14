using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private const int ACCESS_TOKEN_VALIDITY_HOURS = 1;
        private const int REFRESH_TOKEN_VALIDITY_HOURS = 2;
        private const string HEADER_AUTHENTICATION = "Authorization";
        private const string HEADER_PUBLIC_KEY = "x-api-key";

        public async Task<Tokens> GenerateTokens(Claim[] claims)
        {
            var keyPair = GenerateKey();
            var accessTokenTask = GenerateToken(keyPair.PrivateKey, ACCESS_TOKEN_VALIDITY_HOURS, claims);
            var refreshTokenTask = GenerateToken(keyPair.PrivateKey, REFRESH_TOKEN_VALIDITY_HOURS, claims);

            await Task.WhenAll(accessTokenTask, refreshTokenTask);

            // Retrieve the results
            var accessToken = await accessTokenTask;
            var refreshToken = await refreshTokenTask;

            var tokens = new Tokens
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                PublicKey = keyPair.PublicKey
            };

            return tokens;
        }

        public ClaimsPrincipal GetClaimsPrincipal(string tokenString, string publicKeyXml)
        {
            // Load the public key
            RSA publicKey = RSA.Create();
            publicKey.FromXmlString(publicKeyXml); // Replace with your public key XML

            // Create validation parameters using the public key
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireSignedTokens = true, // Require signed tokens
                IssuerSigningKey = new RsaSecurityKey(publicKey)
            };

            // Validate JWT token using only the public key
            var handler = new JwtSecurityTokenHandler();
            var principal = handler.ValidateToken(tokenString, validationParameters, out var validatedToken);

            return principal;
        }

        public HeaderInfo GetTokenFromHeader(HttpContext context)
        {
            if (!context.Request.Headers.ContainsKey(HEADER_AUTHENTICATION))
            {
                return new HeaderInfo
                {
                    IsNeedAuthenticate = false
                };
            }

            if (!context.Request.Headers.ContainsKey(HEADER_PUBLIC_KEY))
            {
                return new HeaderInfo
                {
                    IsNeedAuthenticate = true
                };
            }

            string token = context.Request.Headers[HEADER_AUTHENTICATION].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return new HeaderInfo
                {
                    IsNeedAuthenticate = true
                };
            }

            string publicKey = context.Request.Headers[HEADER_PUBLIC_KEY].FirstOrDefault();
            if (string.IsNullOrEmpty(publicKey))
            {
                return new HeaderInfo
                {
                    IsNeedAuthenticate = true
                };
            }

            return new HeaderInfo
            {
                IsNeedAuthenticate = true,
                Token = token,
                PublicKey = publicKey
            };
        }

        private KeyPair GenerateKey()
        {
            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(2048))
            {
                // Export the RSA parameters
                RSAParameters privateKey = rsa.ExportParameters(true); // Include private key
                RSAParameters publicKey = rsa.ExportParameters(false); // Only public key

                // Convert RSA parameters to XML strings (or other formats as needed)
                string privateKeyXml = rsa.ToXmlString(true);
                string publicKeyXml = rsa.ToXmlString(false);

                return new KeyPair
                {
                    PrivateKey = privateKeyXml,
                    PublicKey = publicKeyXml
                };
            }
        }

        private async Task<string> GenerateToken(string publicKeyXML, int expireTime, Claim[] claims)
        {
            RSA publicKey = RSA.Create();
            publicKey.FromXmlString(publicKeyXML);

            var signingCredentials = new SigningCredentials(
                new RsaSecurityKey(publicKey),
                SecurityAlgorithms.RsaSha256
            );

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(expireTime),
                signingCredentials: signingCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return await Task.FromResult(tokenString);
        }
    }
}
