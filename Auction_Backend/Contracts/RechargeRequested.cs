﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class RechargeRequested
    {
        public string UserId { get; set; }
        public int Amount { get; set; }
    }
}
