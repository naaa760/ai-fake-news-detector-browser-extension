import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function createPlaceholderIcon() {
  try {
    await mkdir("src/extension/icons", { recursive: true });

    // Simple 1x1 pixel PNG in base64
    const iconBase64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const iconBuffer = Buffer.from(iconBase64, "base64");

    // Save icon in different sizes
    for (const size of [16, 48, 128]) {
      await writeFile(
        join("src/extension/icons", `icon${size}.png`),
        iconBuffer
      );
    }

    console.log("Placeholder icons created!");
  } catch (error) {
    console.error("Failed to create icons:", error);
    process.exit(1);
  }
}

createPlaceholderIcon();
