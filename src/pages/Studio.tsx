import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Copy, Download, RefreshCw, Check,
  ChevronDown, ChevronRight, RotateCcw, Eye,
  FileText, Code2, Info, Layers
} from 'lucide-react';
import { PromptConfig, promptConfigSchema, defaultConfig } from '../lib/validation';
import { generatePrompt, estimateTokens } from '../lib/prompt-engine';
import { saveToHistory, copyToClipboard, exportAsMarkdown, exportAsText } from '../lib/storage';

const categoryOptions = [
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'agency', label: 'Creative Agency' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'saas', label: 'SaaS Application' },
  { value: 'dashboard', label: 'Admin Dashboard' },
  { value: 'blog', label: 'Blog / Content' },
  { value: 'educational', label: 'Educational' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'booking', label: 'Booking Platform' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'custom', label: 'Custom' },
];

const designOptions = [
  { value: 'reference-inspired', label: 'Reference-Inspired' },
  { value: 'luxury', label: 'Luxury / Premium' },
  { value: 'minimal', label: 'Minimal / Clean' },
  { value: 'editorial', label: 'Editorial / Magazine' },
  { value: 'brutalist', label: 'Brutalist / Bold' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'playful', label: 'Playful / Creative' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'custom', label: 'Custom' },
];

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'automatic', label: 'Automatic' },
  { value: 'custom', label: 'Custom' },
];

const techOptions = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'react', label: 'React + Vite' },
  { value: 'vue', label: 'Vue.js 3' },
  { value: 'html-css-js', label: 'HTML/CSS/JS' },
  { value: 'nodejs', label: 'Node.js + Express' },
  { value: 'java-spring', label: 'Java / Spring Boot' },
  { value: 'custom', label: 'Custom' },
];

const agentOptions = [
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'qwen-code', label: 'Qwen Code' },
  { value: 'cursor', label: 'Cursor' },
  { value: 'github-copilot', label: 'GitHub Copilot' },
  { value: 'generic', label: 'Generic Agent' },
];

const animationOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'polished', label: 'Polished' },
  { value: 'advanced', label: 'Advanced' },
];

const deploymentOptions = [
  { value: 'vercel', label: 'Vercel' },
  { value: 'aws', label: 'AWS' },
  { value: 'self-hosted', label: 'Self-Hosted' },
  { value: 'other', label: 'Other' },
];

const experienceOptions = [
  { value: 'beginner', label: 'Beginner-Friendly' },
  { value: 'expert', label: 'Expert-Oriented' },
];

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FormSection({ title, icon, children, defaultOpen = true }: FormSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-subtle rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface-secondary transition-colors"
      >
        <span className="text-primary-500">{icon}</span>
        <span className="font-medium text-primary-content flex-1">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-secondary-content" /> : <ChevronRight className="w-4 h-4 text-secondary-content" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SelectField({ label, value, onChange, options, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-content mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-subtle bg-surface-secondary text-primary-content text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && <p className="text-xs text-secondary-content mt-1">{hint}</p>}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, multiline, hint, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; hint?: string; error?: string;
}) {
  const className = `w-full px-3 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-subtle'} bg-surface-secondary text-primary-content text-sm placeholder:text-surface-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none`;
  return (
    <div>
      <label className="block text-sm font-medium text-primary-content mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-secondary-content mt-1">{hint}</p>}
    </div>
  );
}

function CheckboxGroup({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[];
  value: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-primary-content mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              if (value.includes(opt.value)) {
                onChange(value.filter(v => v !== opt.value));
              } else {
                onChange([...value, opt.value]);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              value.includes(opt.value)
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-500'
                : 'border-subtle text-secondary-content hover:border-primary-500/20'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StudioPage() {
  const location = useLocation();
  const [config, setConfig] = useState<PromptConfig>(() => {
    const state = location.state as { description?: string; templateId?: string } | null;
    // Check for template config from session storage
    try {
      const templateConfig = sessionStorage.getItem('template-config');
      if (templateConfig) {
        sessionStorage.removeItem('template-config');
        return { ...defaultConfig, ...JSON.parse(templateConfig) };
      }
    } catch {}
    if (state?.description) {
      return { ...defaultConfig, projectDescription: state.description };
    }
    return defaultConfig;
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  const updateConfig = useCallback(<K extends keyof PromptConfig>(key: K, value: PromptConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleGenerate = useCallback(() => {
    // Validate
    const result = promptConfigSchema.safeParse(config);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path.join('.');
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsGenerating(true);

    // Simulate generation delay for UX
    setTimeout(() => {
      const prompt = generatePrompt(config);
      setGeneratedPrompt(prompt);
      setTokenCount(estimateTokens(prompt));
      setShowOutput(true);
      setIsGenerating(false);

      // Save to history
      saveToHistory({
        config,
        prompt,
        title: config.projectDescription.slice(0, 60) + (config.projectDescription.length > 60 ? '...' : ''),
      });
    }, 800);
  }, [config]);

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setGeneratedPrompt('');
    setShowOutput(false);
    setErrors({});
  };

  const handleDownloadMd = () => {
    exportAsMarkdown(generatedPrompt, 'ai-prompt');
  };

  const handleDownloadTxt = () => {
    exportAsText(generatedPrompt, 'ai-prompt');
  };

  // Validate URL format
  const validateUrl = (url: string) => {
    if (!url) return;
    try {
      new URL(url);
    } catch {
      setErrors(prev => ({ ...prev, referenceUrl: 'Please enter a valid URL' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-content">Prompt Studio</h1>
        <p className="text-secondary-content mt-1">Configure your project and generate an implementation-ready prompt.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Configuration Form */}
        <div className="space-y-4">
          <FormSection title="Project Description" icon={<FileText className="w-4 h-4" />}>
            <TextField
              label="What do you want to build?"
              value={config.projectDescription}
              onChange={v => updateConfig('projectDescription', v)}
              placeholder="Describe your project in detail. Include the purpose, target audience, key features, and any specific requirements..."
              multiline
              error={errors.projectDescription}
              hint="Be specific about what you want. More detail = better prompts."
            />
            <TextField
              label="Reference Website URL (optional)"
              value={config.referenceUrl || ''}
              onChange={v => { updateConfig('referenceUrl', v); validateUrl(v); }}
              placeholder="https://example.com"
              error={errors.referenceUrl}
              hint="Provide a URL for design inspiration. Note: automatic analysis requires server-side configuration."
            />
          </FormSection>

          <FormSection title="Project Configuration" icon={<Code2 className="w-4 h-4" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label="Category"
                value={config.projectCategory}
                onChange={v => updateConfig('projectCategory', v as PromptConfig['projectCategory'])}
                options={categoryOptions}
              />
              <SelectField
                label="Design Direction"
                value={config.designDirection}
                onChange={v => updateConfig('designDirection', v as PromptConfig['designDirection'])}
                options={designOptions}
              />
              <SelectField
                label="Visual Theme"
                value={config.visualTheme}
                onChange={v => updateConfig('visualTheme', v as PromptConfig['visualTheme'])}
                options={themeOptions}
              />
              <SelectField
                label="Technology Stack"
                value={config.techStack}
                onChange={v => updateConfig('techStack', v as PromptConfig['techStack'])}
                options={techOptions}
              />
              <SelectField
                label="Target Coding Agent"
                value={config.codingAgent}
                onChange={v => updateConfig('codingAgent', v as PromptConfig['codingAgent'])}
                options={agentOptions}
              />
              <SelectField
                label="Animation Level"
                value={config.animationLevel}
                onChange={v => updateConfig('animationLevel', v as PromptConfig['animationLevel'])}
                options={animationOptions}
              />
              <SelectField
                label="Deployment Target"
                value={config.deploymentTarget}
                onChange={v => updateConfig('deploymentTarget', v as PromptConfig['deploymentTarget'])}
                options={deploymentOptions}
              />
              <SelectField
                label="Experience Level"
                value={config.experienceLevel}
                onChange={v => updateConfig('experienceLevel', v as PromptConfig['experienceLevel'])}
                options={experienceOptions}
              />
            </div>
            {config.designDirection === 'custom' && (
              <TextField
                label="Custom Design Direction"
                value={config.customDesignDirection || ''}
                onChange={v => updateConfig('customDesignDirection', v)}
                placeholder="Describe your custom design direction..."
              />
            )}
            {config.techStack === 'custom' && (
              <TextField
                label="Custom Technology Stack"
                value={config.customTechStack || ''}
                onChange={v => updateConfig('customTechStack', v)}
                placeholder="Describe your custom tech stack..."
              />
            )}
            <CheckboxGroup
              label="Responsive Targets"
              options={[
                { value: 'mobile', label: '📱 Mobile' },
                { value: 'tablet', label: '📱 Tablet' },
                { value: 'desktop', label: '🖥️ Desktop' },
              ]}
              value={config.responsiveTargets}
              onChange={v => updateConfig('responsiveTargets', v as PromptConfig['responsiveTargets'])}
            />
          </FormSection>

          <FormSection title="Pages & Functionality" icon={<Layers className="w-4 h-4" />} defaultOpen={false}>
            <TextField
              label="Required Pages and Sections"
              value={config.requiredPages || ''}
              onChange={v => updateConfig('requiredPages', v)}
              placeholder="List the pages you need: Home, About, Contact, Blog, Pricing..."
              multiline
              hint="List each page and what it should contain."
            />
            <TextField
              label="Required Functionality"
              value={config.requiredFunctionality || ''}
              onChange={v => updateConfig('requiredFunctionality', v)}
              placeholder="Search, filtering, payment processing, real-time updates..."
              multiline
            />
            <TextField
              label="Authentication, Database & API"
              value={config.authDbApi || ''}
              onChange={v => updateConfig('authDbApi', v)}
              placeholder="User auth with OAuth, PostgreSQL database, REST API..."
              multiline
            />
          </FormSection>

          <FormSection title="Quality Requirements" icon={<Check className="w-4 h-4" />} defaultOpen={false}>
            <TextField
              label="SEO, Accessibility & Performance"
              value={config.seoAccessibility || ''}
              onChange={v => updateConfig('seoAccessibility', v)}
              placeholder="WCAG AA compliance, structured data, Core Web Vitals optimization..."
              multiline
            />
            <TextField
              label="Additional Constraints"
              value={config.additionalConstraints || ''}
              onChange={v => updateConfig('additionalConstraints', v)}
              placeholder="Any other requirements, constraints, or preferences..."
              multiline
            />
          </FormSection>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !config.projectDescription}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Prompt
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl border border-subtle text-secondary-content hover:text-primary-content hover:bg-surface-secondary transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Right: Output Panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-subtle rounded-xl overflow-hidden bg-surface-secondary">
            {/* Output Header */}
            <div className="flex items-center justify-between p-4 border-b border-subtle">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary-500" />
                <span className="font-medium text-primary-content text-sm">Generated Prompt</span>
                {tokenCount > 0 && (
                  <span className="text-xs text-secondary-content px-2 py-0.5 rounded-full bg-surface-tertiary">
                    ~{tokenCount.toLocaleString()} tokens
                  </span>
                )}
              </div>
              {generatedPrompt && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-surface-tertiary text-secondary-content hover:text-primary-content transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleDownloadMd}
                    className="p-2 rounded-lg hover:bg-surface-tertiary text-secondary-content hover:text-primary-content transition-colors"
                    title="Download as Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Output Content */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {showOutput && generatedPrompt ? (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="code-block text-secondary-content whitespace-pre-wrap break-words"
                >
                  {generatedPrompt}
                </motion.pre>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface-tertiary flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-surface-400" />
                  </div>
                  <p className="text-secondary-content text-sm mb-1">No prompt generated yet</p>
                  <p className="text-xs text-surface-400">Fill in the form and click Generate</p>
                </div>
              )}
            </div>

            {/* Output Footer Actions */}
            {showOutput && generatedPrompt && (
              <div className="p-4 border-t border-subtle flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
                <button
                  onClick={handleDownloadMd}
                  className="px-3 py-2 rounded-lg border border-subtle text-secondary-content hover:text-primary-content text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  .md
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="px-3 py-2 rounded-lg border border-subtle text-secondary-content hover:text-primary-content text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  .txt
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-3 py-2 rounded-lg border border-subtle text-secondary-content hover:text-primary-content text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-4 p-4 rounded-xl border border-primary-500/20 bg-primary-500/5">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-content mb-1">Local Generation</p>
                <p className="text-xs text-secondary-content leading-relaxed">
                  Prompts are generated locally using a deterministic builder. No API keys required. 
                  The output is based on your configuration and follows a structured 20-section format 
                  suitable for AI coding agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


