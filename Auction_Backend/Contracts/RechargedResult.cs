using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class RechargedResult
    {
        public string UserId { get; set; }
        public bool IsSuccess { get; set; }
        public double Wallet { get; set; }
        public string Message { get; set; }
        public int Amount { get; set; }
    }
}
