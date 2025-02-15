import { Pipeline } from "@xenova/transformers";
import { ModelOutput } from "@/types/ai";

export class TransformersClient {
  private static instance: TransformersClient;
  private bertPipeline: Pipeline | null = null;
  private robertaPipeline: Pipeline | null = null;

  private constructor() {}

  public static getInstance(): TransformersClient {
    if (!TransformersClient.instance) {
      TransformersClient.instance = new TransformersClient();
    }
    return TransformersClient.instance;
  }

  public async initialize(): Promise<void> {
    const { pipeline } = await import("@xenova/transformers");

    this.bertPipeline = await pipeline(
      "text-classification",
      "models/bert-base.onnx"
    );

    this.robertaPipeline = await pipeline(
      "text-classification",
      "models/roberta-base.onnx"
    );
  }

  public async analyze(text: string): Promise<ModelOutput> {
    if (!this.bertPipeline || !this.robertaPipeline) {
      throw new Error("Models not initialized");
    }

    const [bertResult, robertaResult] = await Promise.all([
      this.bertPipeline(text),
      this.robertaPipeline(text),
    ]);

    return {
      score: this.combineScores(bertResult[0].score, robertaResult[0].score),
      confidence: Math.min(
        bertResult[0].confidence,
        robertaResult[0].confidence
      ),
    };
  }

  private combineScores(bertScore: number, robertaScore: number): number {
    // Weighted average favoring BERT slightly
    return bertScore * 0.6 + robertaScore * 0.4;
  }
}
