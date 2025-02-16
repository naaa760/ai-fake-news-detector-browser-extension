import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

const MODELS = {
  bert: "https://huggingface.co/xenova/fake-news-detection-bert/resolve/main/model.onnx",
  roberta:
    "https://huggingface.co/xenova/fake-news-detection-roberta/resolve/main/model.onnx",
};

async function downloadModels() {
  const modelsDir = path.join(process.cwd(), "public/models");

  try {
    await fs.mkdir(modelsDir, { recursive: true });

    for (const [name, url] of Object.entries(MODELS)) {
      console.log(`Downloading ${name} model...`);
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      await fs.writeFile(
        path.join(modelsDir, `${name}.onnx`),
        Buffer.from(buffer)
      );
    }

    console.log("Models downloaded successfully!");
  } catch (error) {
    console.error("Failed to download models:", error);
    process.exit(1);
  }
}

downloadModels();
