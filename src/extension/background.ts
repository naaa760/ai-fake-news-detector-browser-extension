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
    chrome.runtime.onInstalled.addListener(() => {
      console.log("Extension installed");
    });

    // Initialize content script when tab is activated
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          files: ["content.js"],
        });
      } catch (error) {
        console.error("Failed to inject content script:", error);
      }
    });

    // Handle communication between popup and content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "GET_ANALYSIS") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async (tabs) => {
            if (!tabs[0]?.id) {
              sendResponse({ error: "No active tab" });
              return;
            }

            try {
              const response = await chrome.tabs.sendMessage(tabs[0].id, {
                type: "GET_ANALYSIS",
              });
              sendResponse(response);
            } catch (error) {
              console.error("Error getting analysis:", error);
              sendResponse({ error: "Failed to get analysis" });
            }
          }
        );
        return true; // Keep the message channel open
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
