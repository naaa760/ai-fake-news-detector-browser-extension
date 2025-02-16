import { FakeNewsDetector } from "@/core/ai/model";

describe("FakeNewsDetector", () => {
  let detector: FakeNewsDetector;

  beforeEach(() => {
    detector = new FakeNewsDetector();
  });

  test("should initialize successfully", async () => {
    const result = await detector.initialize();
    expect(result).toBe(true);
  });

  test("should analyze content", async () => {
    await detector.initialize();
    const analysis = await detector.analyzeContent(
      "This is a test article for analysis"
    );

    expect(analysis).toHaveProperty("trustScore");
    expect(analysis.trustScore).toHaveProperty("score");
    expect(analysis.trustScore.score).toBeGreaterThanOrEqual(0);
    expect(analysis.trustScore.score).toBeLessThanOrEqual(1);
  });
});
