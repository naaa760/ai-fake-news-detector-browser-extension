import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = path.join(__dirname, "../src/extension");
const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist/extension");

async function buildExtension() {
  try {
    // Create directories if they don't exist
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Copy static files
    const filesToCopy = [
      "manifest.json",
      "popup.html",
      "popup.css",
      "content.css",
      "background.ts",
      "content.ts",
      "popup.tsx",
    ];

    for (const file of filesToCopy) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(distDir, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${file}`);
      } else {
        console.warn(`Warning: ${file} not found in source directory`);
      }
    }

    // Create a zip file
    const zipCommand = `cd ${distDir} && zip -r ${path.join(
      publicDir,
      "extension.zip"
    )} ./*`;
    const { exec } = await import("child_process");

    exec(zipCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating zip: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Zip stderr: ${stderr}`);
        return;
      }
      console.log("Extension package created successfully!");
    });
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildExtension();
