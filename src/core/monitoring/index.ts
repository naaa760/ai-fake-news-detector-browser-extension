interface PerformanceMetric {
  type: "ANALYSIS" | "API_CALL" | "MODEL_INFERENCE";
  duration: number;
  success: boolean;
  timestamp: number;
  details?: Record<string, unknown>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];

  static getInstance(): PerformanceMonitor {
    if (!this.instance) {
      this.instance = new PerformanceMonitor();
    }
    return this.instance;
  }

  trackMetric(metric: Omit<PerformanceMetric, "timestamp">) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now(),
    });

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Send to storage
    chrome.storage.local.set({
      metrics: this.metrics,
    });
  }

  async getMetrics(): Promise<PerformanceMetric[]> {
    return new Promise((resolve) => {
      chrome.storage.local.get(["metrics"], (result) => {
        resolve(result.metrics || []);
      });
    });
  }
}
