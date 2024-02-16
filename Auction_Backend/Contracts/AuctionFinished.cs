using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class AuctionFinished
    {
        public bool ItemSold { get; set; }
        public int AuctionId { get; set; }
        public string Winner { get; set; }
        public int Amount { get; set; }
    }
}
