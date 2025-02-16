export interface FactCheck {
  source: string;
  claim: string;
  rating: string;
  explanation: string;
  url: string;
  verdict: string;
}

interface SnopesResponse {
  result: {
    rating: string;
    claim: string;
    description: string;
    url: string;
  }[];
}

interface ReutersResponse {
  articles: {
    verdict: string;
    title: string;
    explanation: string;
    link: string;
  }[];
}

export class FactChecker {
  private readonly SNOPES_API_KEY = process.env.SNOPES_API_KEY;
  private readonly REUTERS_API_KEY = process.env.REUTERS_API_KEY;

  async checkClaim(claim: string): Promise<FactCheck[]> {
    try {
      const [snopesResults, reutersResults] = await Promise.all([
        this.checkSnopes(claim),
        this.checkReuters(claim),
      ]);

      return [...snopesResults, ...reutersResults];
    } catch (error) {
      console.error("Fact-checking failed:", error);
      return [];
    }
  }

  private async checkSnopes(claim: string): Promise<FactCheck[]> {
    const response = await fetch(
      `https://api.snopes.com/v1/search?query=${encodeURIComponent(claim)}`,
      {
        headers: {
          Authorization: `Bearer ${this.SNOPES_API_KEY}`,
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return this.parseSnopesResponse(data);
  }

  private async checkReuters(claim: string): Promise<FactCheck[]> {
    const response = await fetch(
      `https://api.reuters.com/fact-check/v1/search?query=${encodeURIComponent(
        claim
      )}`,
      {
        headers: {
          Authorization: `Bearer ${this.REUTERS_API_KEY}`,
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return this.parseReutersResponse(data);
  }

  private parseSnopesResponse(data: SnopesResponse): FactCheck[] {
    return data.result.map((item) => ({
      source: "Snopes",
      claim: item.claim,
      rating: item.rating,
      explanation: item.description,
      url: item.url,
      verdict: item.rating,
    }));
  }

  private parseReutersResponse(data: ReutersResponse): FactCheck[] {
    return data.articles.map((item) => ({
      source: "Reuters",
      claim: item.title,
      rating: item.verdict,
      explanation: item.explanation,
      url: item.link,
      verdict: item.verdict,
    }));
  }
}
