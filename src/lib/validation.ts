import { z } from 'zod';

export const projectCategorySchema = z.enum([
  'portfolio', 'agency', 'ecommerce', 'saas', 'dashboard',
  'blog', 'educational', 'landing-page', 'booking', 'marketplace', 'custom'
]);

export const designDirectionSchema = z.enum([
  'reference-inspired', 'luxury', 'minimal', 'editorial', 'brutalist',
  'futuristic', 'playful', 'corporate', 'custom'
]);

export const visualThemeSchema = z.enum(['light', 'dark', 'automatic', 'custom']);

export const techStackSchema = z.enum([
  'nextjs', 'react', 'vue', 'html-css-js', 'nodejs', 'java-spring', 'custom'
]);

export const codingAgentSchema = z.enum([
  'qwen-code', 'claude-code', 'cursor', 'github-copilot', 'generic'
]);

export const animationLevelSchema = z.enum(['minimal', 'polished', 'advanced']);

export const deploymentTargetSchema = z.enum(['vercel', 'aws', 'self-hosted', 'other']);

export const experienceLevelSchema = z.enum(['beginner', 'expert']);

export const promptConfigSchema = z.object({
  projectDescription: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  referenceUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  projectCategory: projectCategorySchema,
  designDirection: designDirectionSchema,
  visualTheme: visualThemeSchema,
  techStack: techStackSchema,
  codingAgent: codingAgentSchema,
  animationLevel: animationLevelSchema,
  responsiveTargets: z.array(z.enum(['mobile', 'tablet', 'desktop'])).min(1),
  requiredPages: z.string().optional(),
  requiredFunctionality: z.string().optional(),
  authDbApi: z.string().optional(),
  seoAccessibility: z.string().optional(),
  deploymentTarget: deploymentTargetSchema,
  experienceLevel: experienceLevelSchema,
  additionalConstraints: z.string().optional(),
  customDesignDirection: z.string().optional(),
  customTechStack: z.string().optional(),
});

export type PromptConfig = z.infer<typeof promptConfigSchema>;

export const defaultConfig: PromptConfig = {
  projectDescription: '',
  referenceUrl: '',
  projectCategory: 'saas',
  designDirection: 'minimal',
  visualTheme: 'automatic',
  techStack: 'nextjs',
  codingAgent: 'claude-code',
  animationLevel: 'polished',
  responsiveTargets: ['mobile', 'tablet', 'desktop'],
  requiredPages: '',
  requiredFunctionality: '',
  authDbApi: '',
  seoAccessibility: '',
  deploymentTarget: 'vercel',
  experienceLevel: 'expert',
  additionalConstraints: '',
  customDesignDirection: '',
  customTechStack: '',
};
