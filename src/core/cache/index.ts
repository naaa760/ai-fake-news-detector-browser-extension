interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class CacheService<T> {
  private cache: Map<string, CacheEntry<T>>;
  private maxAge: number;

  constructor(maxAgeMs: number = 1000 * 60 * 60) {
    // 1 hour default
    this.cache = new Map();
    this.maxAge = maxAgeMs;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}
