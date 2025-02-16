import { FakeNewsDetector } from "../core/ai/model";
import { FactChecker } from "../core/api/factcheck";

class BackgroundService {
  private detector: FakeNewsDetector;
  private factChecker: FactChecker;
  private cache: Map<string, any>;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.factChecker = new FactChecker();
    this.cache = new Map();
    this.initialize();
  }

  private async initialize() {
    await this.detector.initialize();
    this.setupMessageListeners();
  }

  private setupMessageListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === "ANALYZE_CONTENT") {
        this.handleAnalysis(request.data, sender.tab?.url).then(sendResponse);
        return true; // Keep channel open for async response
      }
    });
  }

  private async handleAnalysis(content: string, url?: string) {
    if (!url) return null;

    // Check cache
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const [aiAnalysis, factChecks] = await Promise.all([
        this.detector.analyzeContent(content),
        this.factChecker.checkClaim(content),
      ]);

      const result = {
        ...aiAnalysis,
        factChecks,
        timestamp: Date.now(),
      };

      this.cache.set(url, result);
      return result;
    } catch (error) {
      console.error("Analysis failed:", error);
      return null;
    }
  }
}

// Initialize background service
new BackgroundService();
