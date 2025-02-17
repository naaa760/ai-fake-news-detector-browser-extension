import * as onnx from "onnxruntime-web";
import { ArticleAnalysis } from "@/types/extension";

export class FakeNewsDetector {
  private bertModel: onnx.InferenceSession | null = null;
  private robertaModel: onnx.InferenceSession | null = null;

  async initialize(): Promise<boolean> {
    try {
      // Set WASM configuration
      const wasmPath = chrome.runtime.getURL("ort-wasm.wasm");
      onnx.env.wasm.wasmPaths = wasmPath;
      onnx.env.wasm.proxy = true; // Enable proxy for better compatibility
      onnx.env.wasm.numThreads = 1;

      // Initialize models with proper paths and options
      const options: onnx.InferenceSession.SessionOptions = {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      };

      // Load models sequentially to avoid memory issues
      this.bertModel = await onnx.InferenceSession.create(
        chrome.runtime.getURL("models/bert.onnx"),
        options
      );

      this.robertaModel = await onnx.InferenceSession.create(
        chrome.runtime.getURL("models/roberta.onnx"),
        options
      );

      return true;
    } catch (error) {
      console.error("Failed to initialize models:", error);
      return false;
    }
  }

  async analyzeContent(text: string): Promise<ArticleAnalysis> {
    if (!this.bertModel || !this.robertaModel) {
      throw new Error("Models not initialized");
    }

    try {
      const cleanText = text.trim().substring(0, 512);

      // For now, return mock analysis
      const trustScore = cleanText.length > 100 ? 0.8 : 0.4;

      return {
        trustScore: {
          score: trustScore,
          confidence: 0.9,
          timestamp: Date.now(),
        },
        factChecks: [],
        warnings:
          cleanText.length < 100
            ? ["Content too short for reliable analysis"]
            : [],
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      throw error;
    }
  }
}
