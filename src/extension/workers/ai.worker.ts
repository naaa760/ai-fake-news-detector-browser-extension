import { FakeNewsDetector } from "../../core/ai/model";
import { ArticleAnalysis } from "@/types/extension";

type WorkerMessage = { type: "INITIALIZE" } | { type: "ANALYZE"; text: string };

type WorkerResponse =
  | { type: "INITIALIZED" }
  | { type: "ANALYSIS_COMPLETE"; data: ArticleAnalysis }
  | { type: "ERROR"; error: string };

const detector = new FakeNewsDetector();

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type } = e.data;

  if (type === "INITIALIZE") {
    await detector.initialize();
    self.postMessage({ type: "INITIALIZED" } satisfies WorkerResponse);
    return;
  }

  if (type === "ANALYZE") {
    try {
      const analysis = await detector.analyzeContent(e.data.text);
      self.postMessage({
        type: "ANALYSIS_COMPLETE",
        data: analysis,
      } satisfies WorkerResponse);
    } catch (error: unknown) {
      self.postMessage({
        type: "ERROR",
        error: error instanceof Error ? error.message : String(error),
      } satisfies WorkerResponse);
    }
  }
};
