import { test, expect, chromium } from "@playwright/test";
import path from "path";

const extensionPath = path.join(__dirname, "../../dist/extension");

test.describe("Extension E2E", () => {
  test("should analyze page content", async () => {
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    const page = await context.newPage();
    await page.goto("https://example.com");

    // Wait for analysis badge
    const badge = await page.waitForSelector("#truthguard-badge");
    expect(badge).toBeTruthy();

    // Check score is displayed
    const score = await badge.waitForSelector(".truthguard-score");
    expect(await score.textContent()).toMatch(/\d+%/);

    await context.close();
  });
});
