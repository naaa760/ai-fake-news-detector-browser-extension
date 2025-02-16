import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import fetch from "node-fetch";

const MODELS = {
  bert: "https://huggingface.co/xenova/fake-news-detection-bert/resolve/main/model.onnx",
  roberta:
    "https://huggingface.co/xenova/fake-news-detection-roberta/resolve/main/model.onnx",
};

async function downloadModels() {
  try {
    // Create models directory
    await mkdir("models", { recursive: true });

    // Download actual models
    for (const [name, url] of Object.entries(MODELS)) {
      console.log(`Downloading ${name} model...`);
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      await writeFile(join("models", `${name}.onnx`), Buffer.from(buffer));
    }

    console.log("Models downloaded successfully!");
  } catch (error) {
    console.error("Failed to download models:", error);
    process.exit(1);
  }
}

downloadModels();
