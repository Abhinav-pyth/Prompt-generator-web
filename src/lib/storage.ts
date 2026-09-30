import { PromptConfig } from './validation';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  config: PromptConfig;
  prompt: string;
  title: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultAgent: string;
  defaultTechStack: string;
  autoSaveHistory: boolean;
}

const HISTORY_KEY = 'ai-prompt-studio-history';
const SETTINGS_KEY = 'ai-prompt-studio-settings';
const MAX_HISTORY = 50;

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): HistoryEntry {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
    timestamp: Date.now(),
  };
  history.unshift(newEntry);
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory().filter(e => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function getSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return getDefaultSettings();
    return { ...getDefaultSettings(), ...JSON.parse(raw) };
  } catch {
    return getDefaultSettings();
  }
}

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

function getDefaultSettings(): AppSettings {
  return {
    theme: 'system',
    defaultAgent: 'claude-code',
    defaultTechStack: 'nextjs',
    autoSaveHistory: true,
  };
}

export function exportAsMarkdown(prompt: string, title: string): void {
  const blob = new Blob([prompt], { type: 'text/markdown' });
  downloadBlob(blob, `${slugify(title)}.md`);
}

export function exportAsText(prompt: string, title: string): void {
  const blob = new Blob([prompt], { type: 'text/plain' });
  downloadBlob(blob, `${slugify(title)}.txt`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 50) || 'prompt';
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch {
      return false;
    }
  }
}
