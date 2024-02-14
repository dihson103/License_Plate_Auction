using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedisManager
{
    public class RedisService : IRedisService
    {
        private static ConcurrentDictionary<string, bool> CacheKeys = new();
        private readonly IDistributedCache _distributedCache;
        public RedisService(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }
        public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default) where T : class
        {
            var cacheValue = await _distributedCache.GetStringAsync(key, cancellationToken);

            if (cacheValue is null)
            {
                return null;
            }

            T? value = JsonConvert.DeserializeObject<T>(cacheValue);
            return value;
        }

        public async Task RemoveAsync(string key, CancellationToken cancellationToken = default)
        {
            await _distributedCache.RemoveAsync(key, cancellationToken);

            CacheKeys.TryRemove(key, out bool _);
        }

        public async Task RemoveByPrefixAsync(string prefix, CancellationToken cancellationToken = default)
        {
            IEnumerable<Task> tasks = CacheKeys.Keys
                .Where(k => k.StartsWith(prefix))
                .Select(k => RemoveAsync(k, cancellationToken));

            await Task.WhenAll(tasks);
        }

        public async Task SetAsync<T>(string key, T value, CancellationToken cancellationToken = default) where T : class
        {
            string cacheValue = JsonConvert.SerializeObject(value);

            await _distributedCache.SetStringAsync(key, cacheValue, cancellationToken);

            CacheKeys.TryAdd(key, false);
        }
    }
}
