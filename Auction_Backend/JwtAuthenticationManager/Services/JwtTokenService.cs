using JwtAuthenticationManager.Abstractions;
using JwtAuthenticationManager.Models;
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
        private static readonly int ACCESS_TOKEN_VALIDITY_HOURS = 1;
        private static readonly int REFRESH_TOKEN_VALIDITY_HOURS = 2;

        public Tokens GenerateTokens(Claim[] claims)
        {
            var keyPair = GenerateKey();
            var accessToken = GenerateToken(keyPair.PrivateKey, ACCESS_TOKEN_VALIDITY_HOURS, claims);
            var refreshToken = GenerateToken(keyPair.PrivateKey, REFRESH_TOKEN_VALIDITY_HOURS, claims);

            return new Tokens
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                PublicKey = keyPair.PublicKey
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

        private string GenerateToken(string publicKeyXML, int expireTime, Claim[] claims)
        {
            //var claims = new[]
            //{
            //    new Claim(ClaimTypes.NameIdentifier, "Nguyen-dinh-son"),
            //    new Claim(ClaimTypes.Role, "ADMIN")
            //};

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

            return tokenString;
        }
    }
}
