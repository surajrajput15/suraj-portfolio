import React from 'react';
import { Code2, Layers, Server, Database, Cpu, Cloud, ShieldCheck, Plug } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <Code2 className="w-4 h-4 text-violet-300" />,
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    icon: <Layers className="w-4 h-4 text-violet-300" />,
    items: [
      'React 19',
      'Next.js 16',
      'Vite 8',
      'Tailwind CSS 4',
      'Zustand',
      'PWA (Workbox)',
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-4 h-4 text-violet-300" />,
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'MVC Architecture'],
  },
  {
    title: 'Databases',
    icon: <Database className="w-4 h-4 text-violet-300" />,
    items: ['MongoDB Atlas', 'Mongoose 9', 'PostgreSQL (Neon)', 'Drizzle ORM', 'Upstash Redis'],
  },
  {
    title: 'AI & Machine Learning',
    icon: <Cpu className="w-4 h-4 text-violet-300" />,
    items: [
      'Groq (LLaMA-3.1)',
      'Google Gemini API',
      'IBM Granite / watsonx.ai',
      'Langflow',
      'RAG Pipelines',
      'Agentic AI',
      'Scikit-Learn',
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: <Cloud className="w-4 h-4 text-violet-300" />,
    items: ['Vercel', 'Render', 'GitHub Actions', 'IBM Cloud', 'Streamlit Cloud'],
  },
  {
    title: 'Auth & Security',
    icon: <ShieldCheck className="w-4 h-4 text-violet-300" />,
    items: [
      'Clerk Auth',
      'Google OAuth',
      'Password / OTP',
      'Helmet',
      'CORS Allowlists',
      'Rate Limiting',
      'Input Validation',
    ],
  },
  {
    title: 'Payments & Integrations',
    icon: <Plug className="w-4 h-4 text-violet-300" />,
    items: ['Razorpay SDK', 'Brevo (Email)', 'Speech-to-Text APIs'],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities Matrix"
          eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
          title="Skills &"
          accent="Technologies"
          subtitle="A consolidated view of the languages, frameworks, databases, and AI tooling I work with to ship production-grade full-stack products."
          align="left"
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <Reveal
              key={category.title}
              delay={idx * 60}
              className="p-5 sm:p-6 rounded-2xl glass hover:border-white/[0.2] transition-all hover:shadow-[0_0_40px_hsl(262_83%_58%_/0.1)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-display text-sm sm:text-base font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span key={item} className="tech-pill text-[11px]">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
