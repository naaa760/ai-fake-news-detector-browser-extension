export class CompatibilityChecker {
  static isSupported(): boolean {
    return typeof Worker !== "undefined" && typeof WebAssembly !== "undefined";
  }

  static getWarning(): string | null {
    if (!this.isSupported()) {
      return "Your browser may not support all features. Please use a modern browser.";
    }
    return null;
  }
}
