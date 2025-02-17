import fs from "fs";
import path from "path";

const wasmFiles = [
  "ort-wasm.wasm",
  "ort-wasm-threaded.wasm",
  "ort-wasm-simd.wasm",
];

const sourceDir = path.join("node_modules", "onnxruntime-web", "dist");
const targetDir = path.join("dist");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

wasmFiles.forEach((file) => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to dist/`);
  } else {
    console.warn(`Warning: ${file} not found in source directory`);
  }
});
