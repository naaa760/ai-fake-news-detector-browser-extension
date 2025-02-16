declare interface Chrome {
  runtime: {
    sendMessage: (
      extensionId: string,
      message: unknown,
      callback: (response: unknown) => void
    ) => void;
  };
}

declare global {
  interface Window {
    chrome: Chrome;
  }
}

export {};
