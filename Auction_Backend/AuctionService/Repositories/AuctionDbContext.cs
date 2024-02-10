﻿using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Repositories
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions option)
            : base(option)
        {

        }

        public DbSet<Auction> Auctions { get; set; }
    }
}
