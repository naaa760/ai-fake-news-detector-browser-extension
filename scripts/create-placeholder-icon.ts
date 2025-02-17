import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function createPlaceholderIcon() {
  try {
    await mkdir("icons", { recursive: true });

    // Simple 1x1 pixel PNG in base64
    const iconBase64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const iconBuffer = Buffer.from(iconBase64, "base64");

    // Save icons directly to icons folder
    for (const size of [16, 48, 128]) {
      await writeFile(join("icons", `icon${size}.png`), iconBuffer);
    }

    console.log("Placeholder icons created!");
  } catch (error) {
    console.error("Failed to create icons:", error);
    process.exit(1);
  }
}

createPlaceholderIcon();
