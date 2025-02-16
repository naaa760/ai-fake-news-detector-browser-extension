import { ArticleAnalysis, TrustScore } from "../types/extension";

// Cache for storing analysis results
const analysisCache = new Map<string, ArticleAnalysis>();

// Initialize AI models
chrome.runtime.onInstalled.addListener(async () => {
  console.log("TruthGuard AI Extension installed");
  // Here we would initialize the ONNX models
  // await initializeModels();
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ANALYZE_CONTENT") {
    handleContentAnalysis(request.data, sender.tab?.url).then(sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function handleContentAnalysis(
  content: string,
  url?: string
): Promise<ArticleAnalysis> {
  if (!url) return createEmptyAnalysis();

  // Check cache first
  if (analysisCache.has(url)) {
    return analysisCache.get(url)!;
  }

  // Perform AI analysis
  const analysis = await analyzeContent(content);
  analysisCache.set(url, analysis);

  return analysis;
}

async function analyzeContent(content: string): Promise<ArticleAnalysis> {
  // Basic content validation
  if (!content.trim()) {
    return createEmptyAnalysis();
  }

  // This would be replaced with actual AI model inference
  const trustScore: TrustScore = {
    score: content.length > 100 ? 0.85 : 0.5, // Simple length-based score for now
    confidence: 0.92,
    source: "TruthGuard AI",
    timestamp: Date.now(),
  };

  return {
    trustScore,
    factChecks: [
      {
        source: "TruthGuard AI",
        verdict: "Likely True",
        url: "",
      },
    ],
    warnings: [],
  };
}

function createEmptyAnalysis(): ArticleAnalysis {
  return {
    trustScore: {
      score: 0,
      confidence: 0,
      source: "TruthGuard AI",
      timestamp: Date.now(),
    },
    factChecks: [],
    warnings: ["Unable to analyze content"],
  };
}
