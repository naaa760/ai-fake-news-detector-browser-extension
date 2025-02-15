import { ArticleContent } from "@/types/ai";

export class ContentScanner {
  private static readonly ARTICLE_SELECTORS = [
    "article",
    '[role="article"]',
    ".post-content",
    ".article-content",
    ".story-content",
  ];

  private static readonly TITLE_SELECTORS = [
    "h1",
    '[role="heading"]',
    ".article-title",
    ".post-title",
  ];

  private observer: MutationObserver | null = null;

  public startScanning(callback: (content: ArticleContent) => void): void {
    this.observer = new MutationObserver(() => {
      const content = this.extractContent();
      if (content) {
        callback(content);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private extractContent(): ArticleContent | null {
    const articleElement = this.findArticleElement();
    if (!articleElement) return null;

    const title = this.extractTitle(articleElement);
    const text = this.extractText(articleElement);

    if (!title || !text) return null;

    return {
      title,
      text,
      url: window.location.href,
      timestamp: Date.now(),
    };
  }

  private findArticleElement(): Element | null {
    for (const selector of ContentScanner.ARTICLE_SELECTORS) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return null;
  }

  private extractTitle(articleElement: Element): string | null {
    for (const selector of ContentScanner.TITLE_SELECTORS) {
      const titleElement = articleElement.querySelector(selector);
      if (titleElement?.textContent) {
        return titleElement.textContent.trim();
      }
    }
    return null;
  }

  private extractText(articleElement: Element): string | null {
    const paragraphs = articleElement.querySelectorAll("p");
    if (paragraphs.length === 0) return null;

    return Array.from(paragraphs)
      .map((p) => p.textContent?.trim())
      .filter(Boolean)
      .join("\n");
  }

  public stopScanning(): void {
    this.observer?.disconnect();
  }
}
