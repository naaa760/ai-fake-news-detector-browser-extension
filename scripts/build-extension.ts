import { build } from "esbuild";
import { copy, ensureDir, pathExists } from "fs-extra";

async function buildExtension() {
  try {
    // Ensure directories exist
    await ensureDir("dist/extension");
    await ensureDir("dist/extension/models");
    await ensureDir("dist/extension/icons");

    // Build content script
    await build({
      entryPoints: ["src/extension/content.ts"],
      bundle: true,
      outfile: "dist/extension/content.js",
      platform: "browser",
      minify: true,
    });

    // Build background script
    await build({
      entryPoints: ["src/extension/background.ts"],
      bundle: true,
      outfile: "dist/extension/background.js",
      platform: "browser",
      minify: true,
    });

    // Build popup
    await build({
      entryPoints: ["src/extension/popup/index.tsx"],
      bundle: true,
      outfile: "dist/extension/popup.js",
      platform: "browser",
      minify: true,
    });

    // Copy static files
    await copy("src/extension/manifest.json", "dist/extension/manifest.json");
    await copy("src/extension/popup.html", "dist/extension/popup.html");
    await copy("src/extension/content.css", "dist/extension/content.css");
    await copy("src/extension/popup.css", "dist/extension/popup.css");
    await copy("models", "dist/extension/models");

    // Copy icons if they exist, create placeholders if not
    if (await pathExists("icons")) {
      await copy("icons", "dist/extension/icons");
    } else {
      console.log("Creating placeholder icons...");
      await ensureDir("icons");
      // Create empty icon files
      for (const size of [16, 48, 128]) {
        await copy(
          "src/extension/placeholder-icon.png",
          `icons/icon${size}.png`
        );
      }
      await copy("icons", "dist/extension/icons");
    }

    console.log("Extension built successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildExtension();
