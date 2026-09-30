import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket, User, ShoppingBag, LayoutDashboard, Palette,
  FileText, Calendar, Zap, ArrowRight, BookOpen, Search
} from 'lucide-react';
import { templates, Template } from '../lib/templates';
import { defaultConfig } from '../lib/validation';

const iconMap: Record<string, React.ElementType> = {
  Rocket, User, ShoppingBag, LayoutDashboard, Palette,
  FileText, Calendar, Zap,
};

export function TemplatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(templates.map(t => t.category))];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = !searchQuery || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    navigate('/studio', {
      state: {
        description: template.config.projectDescription,
        templateId: template.id,
      },
    });
    // Also set the config from template
    const configFromTemplate = { ...defaultConfig, ...template.config };
    sessionStorage.setItem('template-config', JSON.stringify(configFromTemplate));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-content">Prompt Templates</h1>
        <p className="text-secondary-content mt-1">
          Start with a curated template and customize it for your project.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-subtle bg-surface-secondary text-primary-content text-sm placeholder:text-surface-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-500/10 text-primary-500 border border-primary-500/30'
                  : 'border border-subtle text-secondary-content hover:text-primary-content hover:bg-surface-secondary'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-surface-400 mx-auto mb-4" />
          <p className="text-secondary-content">No templates match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, i) => {
            const Icon = iconMap[template.icon] || FileText;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border border-subtle rounded-2xl p-6 hover:border-primary-500/30 hover:bg-surface-secondary transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="text-xs font-medium text-secondary-content px-2 py-1 rounded-full bg-surface-tertiary">
                    {template.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary-content mb-2 group-hover:text-primary-500 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-secondary-content mb-4 leading-relaxed">
                  {template.description}
                </p>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
                >
                  Use Template
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
