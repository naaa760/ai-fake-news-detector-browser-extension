export interface Settings {
  apiKeys: {
    snopes?: string;
    reuters?: string;
  };
  analysisThreshold: number;
  enableNotifications: boolean;
}

export class SettingsManager {
  private static instance: SettingsManager;
  private defaults: Settings = {
    apiKeys: {},
    analysisThreshold: 0.7,
    enableNotifications: true,
  };

  static getInstance(): SettingsManager {
    if (!this.instance) {
      this.instance = new SettingsManager();
    }
    return this.instance;
  }

  async getSettings(): Promise<Settings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(this.defaults, (settings) => {
        resolve(settings as Settings);
      });
    });
  }

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set(settings, resolve);
    });
  }
}
