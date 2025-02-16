import * as onnx from "onnxruntime-web";
import { ArticleAnalysis, TrustScore } from "@/types/extension";

interface ModelInput {
  [key: string]: onnx.Tensor;
  input_ids: onnx.Tensor;
  attention_mask: onnx.Tensor;
}

export class FakeNewsDetector {
  private bertModel!: onnx.InferenceSession;
  private robertaModel!: onnx.InferenceSession;

  constructor() {
    this.initialize().catch(console.error);
  }

  async initialize() {
    try {
      this.bertModel = await onnx.InferenceSession.create(
        "/models/bert-base.onnx"
      );
      this.robertaModel = await onnx.InferenceSession.create(
        "/models/roberta-base.onnx"
      );

      console.log("AI models initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize AI models:", error);
      return false;
    }
  }

  async analyzeContent(text: string): Promise<ArticleAnalysis> {
    try {
      // Get predictions from both models
      const bertScore = await this.runBertInference(text);
      const robertaScore = await this.runRobertaInference(text);

      // Ensemble the predictions
      const trustScore: TrustScore = {
        score: (bertScore + robertaScore) / 2,
        confidence: Math.min(bertScore, robertaScore),
        source: "TruthGuard AI",
        timestamp: Date.now(),
      };

      return {
        trustScore,
        factChecks: [],
        warnings: [],
      };
    } catch (error) {
      console.error("Analysis failed:", error);
      throw error;
    }
  }

  private async runBertInference(text: string): Promise<number> {
    // BERT model inference implementation
    const input = await this.preprocessText(text);
    const output = await this.bertModel.run(input);
    return this.processOutput(output);
  }

  private async runRobertaInference(text: string): Promise<number> {
    // RoBERTa model inference implementation
    const input = await this.preprocessText(text);
    const output = await this.robertaModel.run(input);
    return this.processOutput(output);
  }

  private async preprocessText(text: string): Promise<ModelInput> {
    const tokens = text.split(" ").slice(0, 512);
    const inputIds = new Float32Array(tokens.map((t) => t.length));
    const attentionMask = new Float32Array(tokens.length).fill(1);

    return {
      input_ids: new onnx.Tensor("float32", inputIds, [1, tokens.length]),
      attention_mask: new onnx.Tensor("float32", attentionMask, [
        1,
        tokens.length,
      ]),
    };
  }

  private processOutput(output: Record<string, onnx.Tensor>): number {
    const scores = output.scores;
    return scores.data[0] as number;
  }
}
