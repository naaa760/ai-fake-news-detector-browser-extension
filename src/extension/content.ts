import { ArticleAnalysis } from "../types/extension";

class ContentAnalyzer {
  private observer: MutationObserver;
  private analyzing: boolean = false;

  constructor() {
    this.observer = new MutationObserver(this.handleMutations.bind(this));
    this.initializeAnalyzer();
  }

  private initializeAnalyzer() {
    // Start observing page changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial analysis
    this.analyzeContent();
  }

  private async handleMutations(mutations: MutationRecord[]) {
    if (this.analyzing) return;

    const hasRelevantChanges = mutations.some(
      (mutation) =>
        mutation.type === "childList" && this.isRelevantNode(mutation.target)
    );

    if (hasRelevantChanges) {
      this.analyzeContent();
    }
  }

  private isRelevantNode(node: Node): boolean {
    if (node instanceof Element) {
      const relevantTags = ["article", "main", "div", "p"];
      return relevantTags.includes(node.tagName.toLowerCase());
    }
    return false;
  }

  private async analyzeContent() {
    this.analyzing = true;
    const content = this.extractContent();

    if (content) {
      try {
        const analysis = await this.sendForAnalysis(content);
        this.updateUI(analysis);
      } catch (error) {
        console.error("Analysis failed:", error);
      }
    }

    this.analyzing = false;
  }

  private extractContent(): string {
    // Prioritize article content
    const article = document.querySelector("article");
    if (article) return this.cleanText(article.textContent || "");

    // Fall back to main content
    const main = document.querySelector("main");
    if (main) return this.cleanText(main.textContent || "");

    // Last resort: body content
    return this.cleanText(document.body.textContent || "");
  }

  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, " ")
      .replace(/[^\w\s.,!?-]/g, "")
      .trim();
  }

  private async sendForAnalysis(content: string): Promise<ArticleAnalysis> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: "ANALYZE_CONTENT", data: content },
        (response: ArticleAnalysis) => resolve(response)
      );
    });
  }

  private updateUI(analysis: ArticleAnalysis) {
    // Create or update the floating badge
    const badge = this.getOrCreateBadge();
    this.updateBadgeContent(badge, analysis);
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

  private updateBadgeContent(badge: HTMLElement, analysis: ArticleAnalysis) {
    const score = Math.round(analysis.trustScore.score * 100);
    const color = this.getScoreColor(score);

    badge.innerHTML = `
      <div class="truthguard-score" style="color: ${color}">
        ${score}%
      </div>
      <div class="truthguard-label">
        Credibility Score
      </div>
    `;
  }

  private getScoreColor(score: number): string {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FFC107";
    return "#F44336";
  }
}

// Initialize the analyzer
new ContentAnalyzer();
