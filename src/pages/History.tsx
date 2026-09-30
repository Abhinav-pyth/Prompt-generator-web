import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History as HistoryIcon, Trash2, Copy, Check, Clock,
  AlertTriangle, FileText, ChevronDown, ChevronUp, Search
} from 'lucide-react';
import { getHistory, deleteHistoryEntry, clearHistory, copyToClipboard, HistoryEntry } from '../lib/storage';

export function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setEntries(prev => prev.filter(e => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleClearAll = () => {
    clearHistory();
    setEntries([]);
    setShowClearConfirm(false);
    setExpandedId(null);
  };

  const handleCopy = async (entry: HistoryEntry) => {
    const success = await copyToClipboard(entry.prompt);
    if (success) {
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredEntries = entries.filter(e =>
    !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-content">Generation History</h1>
          <p className="text-secondary-content mt-1">
            Your recent prompt generations, stored locally in your browser.
          </p>
        </div>
        {entries.length > 0 && (
          <div className="relative">
            {showClearConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary-content">Clear all?</span>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 rounded-lg border border-subtle text-secondary-content text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-2 rounded-lg border border-subtle text-secondary-content hover:text-red-500 hover:border-red-500/30 text-sm transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      {entries.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-subtle bg-surface-secondary text-primary-content text-sm placeholder:text-surface-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
          />
        </div>
      )}

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-tertiary flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-8 h-8 text-surface-400" />
          </div>
          <p className="text-secondary-content mb-1">
            {entries.length === 0 ? 'No generation history yet' : 'No matching entries'}
          </p>
          <p className="text-xs text-surface-400">
            {entries.length === 0
              ? 'Generate a prompt in the Studio to see it here.'
              : 'Try a different search term.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.03 }}
                className="border border-subtle rounded-xl overflow-hidden"
              >
                {/* Entry Header */}
                <button
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface-secondary transition-colors"
                >
                  <FileText className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-content truncate">
                      {entry.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-surface-400" />
                      <span className="text-xs text-secondary-content">{formatDate(entry.timestamp)}</span>
                      <span className="text-xs text-secondary-content">•</span>
                      <span className="text-xs text-secondary-content">{entry.config.techStack}</span>
                      <span className="text-xs text-secondary-content">•</span>
                      <span className="text-xs text-secondary-content">{entry.config.projectCategory}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(entry); }}
                      className="p-1.5 rounded-lg hover:bg-surface-tertiary text-secondary-content hover:text-primary-content transition-colors"
                      title="Copy prompt"
                    >
                      {copiedId === entry.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-secondary-content hover:text-red-500 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedId === entry.id ? (
                      <ChevronUp className="w-4 h-4 text-secondary-content" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-secondary-content" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === entry.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-subtle">
                        <div className="mt-3 p-3 rounded-lg bg-surface-tertiary max-h-64 overflow-y-auto">
                          <pre className="code-block text-xs text-secondary-content whitespace-pre-wrap break-words">
                            {entry.prompt}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Info */}
      {entries.length > 0 && (
        <div className="mt-8 p-4 rounded-xl border border-subtle bg-surface-secondary">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-secondary-content">
                History is stored locally in your browser. Clearing browser data will remove all entries. 
                Maximum of 50 entries are kept.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
