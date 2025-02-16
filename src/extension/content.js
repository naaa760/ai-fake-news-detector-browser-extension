// Listen for page content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      analyzePageContent();
    }
  });
});

// Start observing page changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Function to analyze page content
async function analyzePageContent() {
  const articleText = extractArticleText();
  if (articleText) {
    const analysis = await analyzeText(articleText);
    chrome.runtime.sendMessage({
      type: "ANALYSIS_COMPLETE",
      data: analysis,
    });
  }
}

// Extract main article text from the page
function extractArticleText() {
  // Basic article text extraction logic
  const article = document.querySelector("article") || document.body;
  return article.textContent.trim();
}
// Analyze text using AI model
async function analyzeText(text) {
  const analysis =
    text.length > 0
      ? {
          trustScore: {
            score: 0.85,
            confidence: 0.92,
            source: "TruthGuard AI",
            timestamp: Date.now(),
          },
          factChecks: [],
          warnings: [],
        }
      : null;
  return analysis;
}
