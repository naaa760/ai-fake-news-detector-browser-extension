import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = path.join(__dirname, "../src/extension");
const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist/extension");

async function buildExtension() {
  try {
    // Create directories
    await fs.mkdir(distDir, { recursive: true });
    await fs.mkdir(publicDir, { recursive: true });

    // Files to copy
    const filesToCopy = [
      "manifest.json",
      "popup.html",
      "popup.css",
      "content.css",
      "background.ts",
      "content.ts",
      "popup.tsx",
    ];

    // Copy files
    for (const file of filesToCopy) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(distDir, file);

      try {
        await fs.access(sourcePath);
        await fs.copyFile(sourcePath, destPath);
        console.log(`Copied ${file}`);
      } catch (err) {
        console.warn(`Warning: ${file} not found in source directory`);
      }
    }

    // Create zip file
    const zipPath = path.join(publicDir, "extension.zip");
    try {
      await execAsync(`cd "${distDir}" && zip -r "${zipPath}" ./*`);
      console.log("Extension package created successfully!");
    } catch (error) {
      console.error("Error creating zip:", error);
      throw error;
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildExtension().catch(console.error);
