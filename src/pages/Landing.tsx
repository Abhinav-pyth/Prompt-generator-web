import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Code2, Palette, Globe, Zap, Shield,
  Layers, FileText, CheckCircle2, ChevronDown, ChevronUp, Cpu,
  Monitor, Smartphone, Tablet
} from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Reference Analysis',
    description: 'Provide a reference URL and get structured insights about layout, design patterns, and visual direction to inform your prompt.',
  },
  {
    icon: FileText,
    title: 'Structured Prompts',
    description: 'Generate detailed, 20-section prompts covering architecture, design, functionality, accessibility, and deployment.',
  },
  {
    icon: Palette,
    title: 'Design Customization',
    description: 'Choose from multiple design directions — minimal, luxury, brutalist, editorial — and fine-tune every visual aspect.',
  },
  {
    icon: Code2,
    title: 'Multi-Stack Support',
    description: 'Generate prompts optimized for Next.js, React, Vue, plain HTML/CSS, Node.js, and more.',
  },
  {
    icon: Cpu,
    title: 'Agent-Specific Output',
    description: 'Tailor prompts for Claude Code, Qwen Code, Cursor, GitHub Copilot, or any generic AI coding agent.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description: 'Every prompt includes security, performance, accessibility, and deployment considerations built in.',
  },
];

const faqs = [
  {
    q: 'What is AI Prompt Studio?',
    a: 'AI Prompt Studio helps you create detailed, structured prompts for AI coding agents. Instead of vague instructions, you get comprehensive implementation guides that cover architecture, design, functionality, and deployment.',
  },
  {
    q: 'Which AI coding agents are supported?',
    a: 'Prompts are optimized for Claude Code, Qwen Code, Cursor, GitHub Copilot, and any generic AI coding agent. The output format works with all of them.',
  },
  {
    q: 'Do I need an API key to use it?',
    a: 'No. The local prompt builder works without any API keys. It generates comprehensive prompts based on your configuration. AI-powered generation is optional and requires your own API key.',
  },
  {
    q: 'Can I use the reference URL feature?',
    a: 'Reference URL analysis requires a server-side browser inspection service to be configured. Without it, you can still provide the URL as context, and the prompt builder will note it appropriately.',
  },
  {
    q: 'Is my data stored anywhere?',
    a: 'All data stays in your browser\'s local storage. Nothing is sent to external servers unless you configure an AI provider. You can clear your history at any time.',
  },
  {
    q: 'Can I customize the generated prompts?',
    a: 'Yes! After generation, you can copy the prompt and edit it, use the Improve/Detail/Simplify actions, or adjust your configuration and regenerate.',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [quickInput, setQuickInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuickStart = () => {
    if (quickInput.trim().length >= 10) {
      navigate('/studio', { state: { description: quickInput } });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Generate implementation-ready prompts
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-content mb-6">
              Build Better Websites with{' '}
              <span className="gradient-text">AI-Powered Prompts</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-secondary-content max-w-2xl mx-auto mb-10">
              Transform your ideas into detailed, structured prompts that AI coding agents can actually implement. 
              From reference URLs to full specifications — get prompts that produce production-ready code.
            </p>

            {/* Quick Start Input */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-subtle bg-surface-secondary">
                <input
                  type="text"
                  value={quickInput}
                  onChange={e => setQuickInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleQuickStart()}
                  placeholder="Describe the website you want to build..."
                  className="flex-1 px-4 py-3 bg-transparent text-primary-content placeholder:text-surface-400 outline-none text-base"
                />
                <button
                  onClick={handleQuickStart}
                  disabled={quickInput.trim().length < 10}
                  className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-secondary-content mt-3">
                Or go to the <Link to="/studio" className="text-primary-500 hover:underline">full Studio</Link> for advanced configuration
              </p>
            </div>
          </motion.div>

          {/* Example Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'SaaS Landing Page', desc: 'Hero, features, pricing, testimonials' },
              { label: 'E-Commerce Store', desc: 'Product catalog, cart, checkout flow' },
              { label: 'Portfolio Site', desc: 'Projects, skills, contact form' },
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuickInput(`Build a ${example.label.toLowerCase()} with ${example.desc.toLowerCase()}`);
                }}
                className="p-4 rounded-xl border border-subtle bg-surface-secondary hover:border-primary-500/30 hover:bg-surface-tertiary transition-all text-left group"
              >
                <div className="text-sm font-medium text-primary-content group-hover:text-primary-500 transition-colors">
                  {example.label}
                </div>
                <div className="text-xs text-secondary-content mt-1">{example.desc}</div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              Everything You Need for Perfect Prompts
            </h2>
            <p className="text-lg text-secondary-content max-w-2xl mx-auto">
              A comprehensive toolkit for generating prompts that AI agents can actually follow to build production-quality websites.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-subtle bg-surface-secondary hover:border-primary-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-primary-content mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary-content leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              From Idea to Implementation
            </h2>
            <p className="text-lg text-secondary-content">
              A simple workflow that produces comprehensive, actionable prompts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Describe', desc: 'Enter your project description and optional reference URL', icon: FileText },
              { step: '02', title: 'Configure', desc: 'Choose your stack, design direction, and requirements', icon: Layers },
              { step: '03', title: 'Generate', desc: 'Get a detailed, structured implementation prompt', icon: Zap },
              { step: '04', title: 'Build', desc: 'Feed the prompt to your AI coding agent and ship', icon: Code2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div className="text-xs font-mono text-primary-500 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-primary-content mb-2">{item.title}</h3>
                <p className="text-sm text-secondary-content">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              The Difference a Good Prompt Makes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm font-medium text-red-500">Before — Vague Prompt</span>
              </div>
              <p className="text-sm text-secondary-content font-mono leading-relaxed">
                "Build me a website for my business. Make it look nice and modern. It should have a contact form and show my services."
              </p>
              <div className="mt-4 pt-4 border-t border-red-500/10">
                <p className="text-xs text-secondary-content">
                  ❌ No tech stack specified<br />
                  ❌ No design direction<br />
                  ❌ Missing pages and features<br />
                  ❌ No accessibility requirements<br />
                  ❌ No deployment instructions
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-500">After — AI Prompt Studio</span>
              </div>
              <p className="text-sm text-secondary-content font-mono leading-relaxed">
                "# AI Implementation Prompt\n\n## 1. Role and Objective\nYou are an expert full-stack developer. Build a modern SaaS landing page using Next.js App Router with..."
              </p>
              <div className="mt-4 pt-4 border-t border-green-500/10">
                <p className="text-xs text-secondary-content">
                  ✅ Complete tech stack and architecture<br />
                  ✅ Detailed design system and tokens<br />
                  ✅ Page-by-page requirements<br />
                  ✅ Accessibility and SEO specifications<br />
                  ✅ Deployment instructions included
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsive Targets */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              Optimized for Every Device
            </h2>
            <p className="text-lg text-secondary-content">
              Generated prompts include responsive design specifications for all target devices.
            </p>
          </motion.div>
          <div className="flex justify-center gap-8 sm:gap-16">
            {[
              { icon: Smartphone, label: 'Mobile', size: '320px+' },
              { icon: Tablet, label: 'Tablet', size: '768px+' },
              { icon: Monitor, label: 'Desktop', size: '1024px+' },
            ].map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <device.icon className="w-10 h-10 text-primary-500 mx-auto mb-3" />
                <div className="font-medium text-primary-content">{device.label}</div>
                <div className="text-xs text-secondary-content">{device.size}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-subtle rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-secondary transition-colors"
                >
                  <span className="font-medium text-primary-content pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-secondary-content flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-secondary-content flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-secondary-content leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">
              Ready to Build Better Prompts?
            </h2>
            <p className="text-lg text-secondary-content mb-8">
              Start generating detailed, implementation-ready prompts for your next project.
            </p>
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-lg transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Open the Studio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
