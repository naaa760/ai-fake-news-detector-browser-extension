import React, { useEffect, useState } from "react";
import { Settings, SettingsManager } from "@/core/settings";
import { Loader2 } from "lucide-react";

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Settings>();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const manager = SettingsManager.getInstance();
    const currentSettings = await manager.getSettings();
    setSettings(currentSettings);
  };

  const handleSave = async (updates: Partial<Settings>) => {
    setIsSaving(true);
    try {
      const manager = SettingsManager.getInstance();
      await manager.updateSettings(updates);
      await loadSettings();
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-4 relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium">API Keys</h3>
        <div className="mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Snopes API Key
            </label>
            <input
              type="password"
              value={settings.apiKeys.snopes || ""}
              onChange={(e) =>
                handleSave({
                  apiKeys: { ...settings.apiKeys, snopes: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reuters API Key
            </label>
            <input
              type="password"
              value={settings.apiKeys.reuters || ""}
              onChange={(e) =>
                handleSave({
                  apiKeys: { ...settings.apiKeys, reuters: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <div className="mt-2 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.enableNotifications}
              onChange={(e) =>
                handleSave({ enableNotifications: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Enable Notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
