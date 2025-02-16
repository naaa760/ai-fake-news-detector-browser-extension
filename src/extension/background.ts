import { FakeNewsDetector } from "../core/ai/model";
import { ArticleAnalysis } from "@/types/extension";
import { PerformanceService } from "../core/performance";

class BackgroundService {
  private detector: FakeNewsDetector;
  private cache: Map<string, ArticleAnalysis>;
  private performance: PerformanceService;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.cache = new Map();
    this.performance = PerformanceService.getInstance();
    this.initialize();
  }

  private async initialize() {
    await this.detector.initialize();
    this.setupMessageListeners();
  }

  private setupMessageListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === "ANALYZE_PAGE") {
        this.handleAnalysis(request.content, sender.tab?.url).then(
          sendResponse
        );
        return true;
      }
    });
  }

  private async handleAnalysis(content: string, url?: string) {
    if (!url) return null;

    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const startTime = performance.now();
    try {
      const analysis = await this.detector.analyzeContent(content);
      this.performance.trackModelPerformance(startTime);
      this.cache.set(url, analysis);
      return analysis;
    } catch (error) {
      console.error("Analysis failed:", error);
      return null;
    }
  }
}

// Initialize background service
new BackgroundService();
