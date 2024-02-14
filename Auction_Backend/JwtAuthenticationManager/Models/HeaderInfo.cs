using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Models
{
    public class HeaderInfo
    {
        public bool IsNeedAuthenticate { get; set; }
        public string? Token { get; set; }
        public string? PublicKey { get; set; }
    }
}
