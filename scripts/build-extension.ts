import { build } from "esbuild";
import { copy, ensureDir, remove, pathExists } from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildExtension() {
  try {
    // Clean previous build
    await remove("dist");

    // Ensure all required directories exist
    await ensureDir("dist/extension");
    await ensureDir("dist/extension/icons");
    await ensureDir("dist/extension/models");
    await ensureDir("models"); // Ensure models directory exists

    // Check if node_modules exists
    const onnxPath = join(__dirname, "../node_modules/onnxruntime-web");
    if (!(await pathExists(onnxPath))) {
      throw new Error("onnxruntime-web not found. Run npm install first.");
    }

    // Build scripts
    await build({
      entryPoints: ["src/extension/content.ts"],
      bundle: true,
      outfile: "dist/extension/content.js",
      platform: "browser",
      minify: true,
    });

    await build({
      entryPoints: ["src/extension/background.ts"],
      bundle: true,
      outfile: "dist/extension/background.js",
      platform: "browser",
      minify: true,
    });

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
    await copy("icons", "dist/extension/icons");

    // Copy models if they exist
    if (await pathExists("models")) {
      await copy("models", "dist/extension/models");
    }

    // Copy ONNX Runtime WASM files
    const wasmFiles = [
      "ort-wasm.wasm",
      "ort-wasm-threaded.wasm",
      "ort-wasm-simd.wasm",
    ];

    for (const file of wasmFiles) {
      const sourcePath = join(onnxPath, "dist", file);
      if (await pathExists(sourcePath)) {
        await copy(sourcePath, join("dist/extension", file));
      }
    }

    console.log("Extension built successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildExtension();
