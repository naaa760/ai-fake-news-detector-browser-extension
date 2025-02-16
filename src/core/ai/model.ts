import * as onnx from "onnxruntime-web";
import { ArticleAnalysis } from "@/types/extension";
import { PerformanceService } from "../performance";

export class FakeNewsDetector {
  private model: onnx.InferenceSession | null = null;
  private performance = PerformanceService.getInstance();
  private isInitializing = false;

  async initialize(): Promise<boolean> {
    if (this.model) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    const startTime = performance.now();

    try {
      this.model = await onnx.InferenceSession.create("models/detector.onnx", {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });
      this.performance.trackModelPerformance(startTime);
      return true;
    } catch (error) {
      console.error("Failed to initialize model:", error);
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  async analyzeContent(content: string): Promise<ArticleAnalysis> {
    if (!this.model) {
      await this.initialize();
    }

    // Simplified analysis for demo
    const score = Math.random() * 0.5 + 0.3;
    const confidence = Math.min(0.9, score + 0.1);

    return {
      trustScore: {
        score,
        confidence,
        timestamp: Date.now(),
      },
      factChecks: [],
      warnings:
        content.length < 100 ? ["Content too short for reliable analysis"] : [],
    };
  }
}
