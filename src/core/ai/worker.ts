import { CredibilityAnalyzer } from "./ensemble";
import { ArticleContent } from "@/types/ai";

const analyzer = new CredibilityAnalyzer();

self.addEventListener(
  "message",
  async (event: MessageEvent<ArticleContent>) => {
    try {
      const result = await analyzer.analyze(event.data);
      self.postMessage(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        self.postMessage({ error: error.message });
      } else {
        self.postMessage({ error: "An unknown error occurred" });
      }
    }
  }
);

export {};
