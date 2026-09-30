import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, Sun, Moon, Monitor, Save, Check,
  Info, Shield, Database, Key
} from 'lucide-react';
import { getSettings, saveSettings, AppSettings } from '../lib/storage';
import { useTheme } from '../lib/theme';

const agentOptions = [
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'qwen-code', label: 'Qwen Code' },
  { value: 'cursor', label: 'Cursor' },
  { value: 'github-copilot', label: 'GitHub Copilot' },
  { value: 'generic', label: 'Generic Agent' },
];

const techOptions = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'react', label: 'React + Vite' },
  { value: 'vue', label: 'Vue.js 3' },
  { value: 'html-css-js', label: 'HTML/CSS/JS' },
  { value: 'nodejs', label: 'Node.js + Express' },
  { value: 'java-spring', label: 'Java / Spring Boot' },
];

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettingsState] = useState<AppSettings>(getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setSettingsState(prev => ({ ...prev, theme: newTheme }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-content">Settings</h1>
        <p className="text-secondary-content mt-1">
          Configure your preferences for AI Prompt Studio.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-subtle rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Sun className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-content">Appearance</h2>
              <p className="text-xs text-secondary-content">Choose your preferred theme</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light' as const, label: 'Light', icon: Sun },
              { value: 'dark' as const, label: 'Dark', icon: Moon },
              { value: 'system' as const, label: 'System', icon: Monitor },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => handleThemeChange(opt.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === opt.value
                    ? 'border-primary-500/50 bg-primary-500/10 text-primary-500'
                    : 'border-subtle text-secondary-content hover:border-primary-500/20'
                }`}
              >
                <opt.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Defaults */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-subtle rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <SettingsIcon className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-content">Defaults</h2>
              <p className="text-xs text-secondary-content">Pre-fill the studio with your preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-content mb-1.5">
                Default Coding Agent
              </label>
              <select
                value={settings.defaultAgent}
                onChange={e => setSettingsState(prev => ({ ...prev, defaultAgent: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-subtle bg-surface-secondary text-primary-content text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              >
                {agentOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-content mb-1.5">
                Default Technology Stack
              </label>
              <select
                value={settings.defaultTechStack}
                onChange={e => setSettingsState(prev => ({ ...prev, defaultTechStack: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-subtle bg-surface-secondary text-primary-content text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              >
                {techOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-content">Auto-save to History</p>
                <p className="text-xs text-secondary-content">Automatically save generated prompts to history</p>
              </div>
              <button
                onClick={() => setSettingsState(prev => ({ ...prev, autoSaveHistory: !prev.autoSaveHistory }))}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.autoSaveHistory ? 'bg-primary-600' : 'bg-surface-400'
                }`}
              >
                <span
                  style={{ transform: settings.autoSaveHistory ? 'translateX(22px)' : 'translateX(2px)' }}
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Provider Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-subtle rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Key className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-content">AI Provider (Optional)</h2>
              <p className="text-xs text-secondary-content">Configure an AI provider for enhanced generation</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-surface-tertiary border border-subtle">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-secondary-content">
                  AI-powered generation requires server-side configuration with API credentials. 
                  The local prompt builder works without any API keys and generates comprehensive prompts.
                </p>
                <p className="text-sm text-secondary-content mt-2">
                  To enable AI-powered generation, deploy with the appropriate environment variables 
                  configured on your server. See the README for details.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-subtle rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-content">Data & Privacy</h2>
              <p className="text-xs text-secondary-content">How your data is handled</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Database className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-secondary-content">
                All data is stored locally in your browser. Nothing is sent to external servers 
                unless you configure an AI provider.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-secondary-content">
                No account required. No tracking. No cookies beyond local storage.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-secondary-content">
                Clearing browser data will remove all saved history and settings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
