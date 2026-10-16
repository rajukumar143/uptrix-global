import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback for environments without Upstash configured
const memoryStore = new Map();

function memoryRateLimit(identifier, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const userTimestamps = memoryStore.get(identifier) || [];
  const validTimestamps = userTimestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    return { success: false, remaining: 0, reset: Math.ceil((validTimestamps[0] + windowMs - now) / 1000) };
  }

  validTimestamps.push(now);
  memoryStore.set(identifier, validTimestamps);
  return { success: true, remaining: limit - validTimestamps.length, reset: 60 };
}

let upstashRatelimit = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "ratelimit:login",
    });
  } catch (err) {
    console.warn("[rate-limit] Upstash Redis initialization error, using memory fallback:", err.message);
  }
}

/**
 * Rate limit check for login requests (10 per minute per IP)
 */
export async function checkLoginRateLimit(ipAddress) {
  const identifier = ipAddress || "127.0.0.1";

  if (upstashRatelimit) {
    try {
      const { success, remaining, reset } = await upstashRatelimit.limit(identifier);
      return { success, remaining, reset };
    } catch (err) {
      console.error("[rate-limit] Upstash error, falling back to memory limiter:", err.message);
      return memoryRateLimit(identifier, 10, 60000);
    }
  }

  // Graceful fallback when Upstash env vars are omitted in local development
  return memoryRateLimit(identifier, 10, 60000);
}
