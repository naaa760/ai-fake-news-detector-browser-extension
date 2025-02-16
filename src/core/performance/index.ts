interface PerformanceData {
  modelLoadTime: number;
  inferenceTime: number;
}

export class PerformanceService {
  private static instance: PerformanceService;
  private metrics: PerformanceData[] = [];

  static getInstance(): PerformanceService {
    if (!this.instance) {
      this.instance = new PerformanceService();
    }
    return this.instance;
  }

  trackModelPerformance(startTime: number): void {
    const duration = performance.now() - startTime;
    this.metrics.push({
      modelLoadTime: duration,
      inferenceTime: 0,
    });

    if (duration > 5000) {
      console.warn("Model loading is taking longer than expected");
    }
  }

  getMetrics(): PerformanceData[] {
    return this.metrics;
  }
}
