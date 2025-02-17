import { FakeNewsDetector } from "@/core/ai/model";
import { ArticleAnalysis } from "@/types/extension";

class ContentScript {
  private detector: FakeNewsDetector;
  private badge: HTMLDivElement | null = null;
  private currentAnalysis: ArticleAnalysis | null = null;
  private isInitialized = false;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.initialize();
    this.setupMessageListener();
  }

  private setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
      if (request.type === "GET_ANALYSIS") {
        if (!this.isInitialized) {
          sendResponse({ error: "Content script not initialized" });
          return;
        }
        sendResponse({ success: true, data: this.currentAnalysis });
      }
      return true;
    });
  }

  private async initialize() {
    try {
      this.createBadge();
      this.updateBadgeState("analyzing");

      const initialized = await this.detector.initialize();
      if (!initialized) {
        throw new Error("Failed to initialize models");
      }

      await this.analyzeCurrentPage();
      this.isInitialized = true;
      this.updateBadgeState("complete");
    } catch (error) {
      console.error("Initialization failed:", error);
      this.updateBadgeState("error");
    }
  }

  private createBadge() {
    this.badge = document.createElement("div");
    this.badge.className = "truthguard-badge";
    this.badge.textContent = "Analyzing...";
    document.body.appendChild(this.badge);
  }

  private async analyzeCurrentPage() {
    try {
      const content = document.body.innerText;
      this.currentAnalysis = await this.detector.analyzeContent(content);
      this.updateBadgeState("complete");
    } catch (error) {
      console.error("Analysis failed:", error);
      this.updateBadgeState("error");
    }
  }

  private updateBadgeState(state: "analyzing" | "complete" | "error") {
    if (!this.badge) return;

    switch (state) {
      case "analyzing":
        this.badge.textContent = "Analyzing...";
        this.badge.style.backgroundColor = "#FFA500";
        break;
      case "complete":
        if (this.currentAnalysis) {
          const score = Math.round(this.currentAnalysis.trustScore.score * 100);
          this.badge.textContent = `${score}%`;
          this.badge.style.backgroundColor = score > 70 ? "#4CAF50" : "#FF5722";
        }
        break;
      case "error":
        this.badge.textContent = "Error";
        this.badge.style.backgroundColor = "#F44336";
        break;
    }
  }
}

// Define interface for window with our content script
interface ExtendedWindow extends Window {
  contentScript: ContentScript;
}

// Create a global instance
const contentScript = new ContentScript();
(window as unknown as ExtendedWindow).contentScript = contentScript;
