import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "../src/extension");
const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist/extension");

// Ensure directories exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy and compile extension files
async function buildExtension() {
  try {
    // Copy static files
    const filesToCopy = [
      "manifest.json",
      "popup.html",
      "popup.css",
      "content.css",
    ];

    filesToCopy.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(distDir, file);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    });

    // Create extension.zip in public folder
    exec(
      `cd ${distDir} && zip -r ${publicDir}/extension.zip ./*`,
      (error: Error | null) => {
        if (error) {
          console.error("Error creating zip:", error);
          return;
        }
        console.log("Extension package created successfully!");
      }
    );
  } catch (error) {
    console.error("Build failed:", error);
  }
}

buildExtension();
