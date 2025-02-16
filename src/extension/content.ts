import { FakeNewsDetector } from "../core/ai/model";
import { FactChecker } from "../core/api/factcheck";
import { ArticleAnalysis } from "@/types/extension";
import type { FactCheck } from "../core/api/factcheck";

class ContentAnalyzer {
  private detector: FakeNewsDetector;
  private factChecker: FactChecker;
  private analyzing = false;

  constructor() {
    this.detector = new FakeNewsDetector();
    this.factChecker = new FactChecker();
    this.initializeAnalyzer();
  }

  private async initializeAnalyzer() {
    await this.detector.initialize();
    this.analyzeCurrentPage();
    this.observePageChanges();
  }

  private observePageChanges() {
    const observer = new MutationObserver(() => {
      if (!this.analyzing) {
        this.analyzeCurrentPage();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private async analyzeCurrentPage() {
    this.analyzing = true;
    try {
      const content = this.extractPageContent();
      if (!content) return;

      const [aiAnalysis, factChecks] = await Promise.all([
        this.detector.analyzeContent(content),
        this.factChecker.checkClaim(content),
      ]);

      this.updateUI({
        ...aiAnalysis,
        factChecks,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      this.analyzing = false;
    }
  }

  private extractPageContent(): string {
    const article = document.querySelector("article");
    if (article) return article.textContent || "";

    const mainContent = document.querySelector("main");
    if (mainContent) return mainContent.textContent || "";

    return document.body.textContent || "";
  }

  private updateUI(analysis: ArticleAnalysis & { factChecks: FactCheck[] }) {
    const badge = this.getOrCreateBadge();
    const score = Math.round(analysis.trustScore.score * 100);

    badge.innerHTML = `
      <div class="truthguard-score" style="color: ${this.getScoreColor(score)}">
        ${score}%
      </div>
      <div class="truthguard-label">Credibility Score</div>
    `;
  }

  private getOrCreateBadge(): HTMLElement {
    let badge = document.getElementById("truthguard-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "truthguard-badge";
      badge.className = "truthguard-badge";
      document.body.appendChild(badge);
    }
    return badge;
  }

  private getScoreColor(score: number): string {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FFC107";
    return "#F44336";
  }
}

// Initialize the analyzer
new ContentAnalyzer();
