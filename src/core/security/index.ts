import { Buffer } from "buffer";

interface RateLimit {
  count: number;
  timestamp: number;
}

export class SecurityService {
  private static instance: SecurityService;
  private rateLimits: Map<string, RateLimit> = new Map();
  private readonly MAX_REQUESTS = 50;
  private readonly WINDOW_MS = 3600000; // 1 hour

  private constructor() {}

  static getInstance(): SecurityService {
    if (!this.instance) {
      this.instance = new SecurityService();
    }
    return this.instance;
  }

  encryptApiKey(key: string): string {
    return Buffer.from(key).toString("base64");
  }

  decryptApiKey(encrypted: string): string {
    return Buffer.from(encrypted, "base64").toString("utf-8");
  }

  sanitizeContent(html: string): string {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.textContent || "";
  }

  checkRateLimit(key: string): boolean {
    const now = Date.now();
    const limit = this.rateLimits.get(key) || { count: 0, timestamp: now };

    if (now - limit.timestamp > this.WINDOW_MS) {
      limit.count = 1;
      limit.timestamp = now;
    } else if (limit.count >= this.MAX_REQUESTS) {
      return false;
    } else {
      limit.count++;
    }

    this.rateLimits.set(key, limit);
    return true;
  }

  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
