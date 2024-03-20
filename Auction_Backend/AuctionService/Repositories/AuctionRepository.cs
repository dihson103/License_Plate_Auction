using AuctionService.Dtos;
using AuctionService.Entities;
using AuctionService.Repositories.Abstract;
using AutoMapper;
using Contracts;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Repositories
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly AuctionDbContext _context;
        public AuctionRepository(AuctionDbContext context)
        {
            _context = context;
        }
        public Auction GetById(int id)
        {
            return _context.Auctions
                .Include(a => a.Item)
                .FirstOrDefault(x => x.AuctionId == id);
        }

        public List<Auction> GetAll()
        {
            return _context.Auctions.Include(a => a.Item).ToList();
        }

        public bool HasAuction(int id)
        {
            return _context.Auctions.Any(a => a.AuctionId == id);
        }

        public async Task<bool> CreateAuctionAsync(Auction auction)
        {
            _context.Auctions.Add(auction);
       
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> UpdateAuctionAsync(Auction auction)
        {
            _context.Auctions.Update(auction);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> DeleteAuctionAsync(Auction auction)
        {
            _context.Auctions.Remove(auction);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<List<Auction>> GetAuctionUpdatedByUpdateDate(string updateAt)
        {
            return await _context.Auctions.Where(x => 
            x.UpdateAt.CompareTo(DateTime.Parse(updateAt).ToUniversalTime()) > 0).ToListAsync();
        }

        public async Task<int> GetNewIdInserted()
        {
            return await _context.Auctions.MaxAsync(x => x.AuctionId) + 1;
        }

        public async Task<(List<Auction> Auctions, int TotalPages)> SearchAuction(AuctionSearchParams searchParams)
        {
            var query = _context.Auctions
                .Include(x => x.Item)
                .Where(ac => ac.Status == searchParams.Status);

            if (!string.IsNullOrWhiteSpace(searchParams.SearchTerm))
            {
                query = _context.Auctions
                .Include(x => x.Item)
                .Where(ac => ac.Status == searchParams.Status 
                    && ac.Item.LicensePlate.Contains(searchParams.SearchTerm));
            }

            var totalItems = await query.CountAsync();

            int totalPages = (int)Math.Ceiling((double)totalItems / searchParams.PageSize);

            var auctions = await query
                .OrderBy(ac => ac.AuctionId)
                .Skip((searchParams.PageIndex - 1) * searchParams.PageSize)
                .Take(searchParams.PageSize)
                .ToListAsync();

            return (auctions, totalPages);
        }

        public async Task UpdateListAuctionAsync(List<Auction> auctions)
        {
            _context.Auctions.UpdateRange(auctions);
            await _context.SaveChangesAsync();
        }

        public async Task<Auction> GetByIdAsync(int id)
        {
            return await _context.Auctions
                .Include(x => x.Item)
                .SingleOrDefaultAsync(a => a.AuctionId == id);
        }

        public async Task<List<Auction>> GetStartLiveListAsync()
        {
            var currentDate = DateTime.UtcNow;
            return await _context.Auctions
                .Include(x => x.Item)
                .Where(x => x.Status == Status.Pending && x.StartDateTime <= currentDate && x.EndDateTime > currentDate)
                .AsSplitQuery()
                .ToListAsync();
        }

        public async Task<bool> IsLisensePlateExist(string lisensePlate)
        {
            return await _context.Auctions
                .Include(x => x.Item)
                .AnyAsync(x => x.Item.LicensePlate == lisensePlate);   
        }

        public async Task<List<Auction>> GetAuctionsOfWinner(string winner)
        {
            return await _context.Auctions
                .Include(x => x.Item)
                .Where(x => x.Winner == winner)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<int> GetNumberLiving()
        {
            return await _context.Auctions
                .Where(x => x.Status == Status.Live)
                .CountAsync();
        }

        public async Task<int> GetNumberFinished()
        {
            return await _context.Auctions
                .Where(x => x.Status == Status.Finished)
                .CountAsync();
        }

        public async Task<int> GetTotalMoney()
        {
            return await _context.Auctions
                .Where(x => x.Status == Status.Finished)
                .SumAsync(x => x.CurrentHighBid ?? 0);
        }
    }
}
