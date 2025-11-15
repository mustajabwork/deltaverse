import { LRUCache } from "lru-cache";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // adjust to taste

const cache = new LRUCache({
  max: 5000,
  ttl: RATE_LIMIT_WINDOW_MS * 2,
});

export function checkRateLimit(key) {
  const now = Date.now();
  const entry = cache.get(key) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    // reset window
    entry.count = 1;
    entry.start = now;
    cache.set(key, entry);
    return {
      ok: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      reset: RATE_LIMIT_WINDOW_MS,
    };
  }

  entry.count += 1;
  cache.set(key, entry);

  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return {
      ok: false,
      remaining: 0,
      reset: RATE_LIMIT_WINDOW_MS - (now - entry.start),
    };
  }
  return {
    ok: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    reset: RATE_LIMIT_WINDOW_MS - (now - entry.start),
  };
}
