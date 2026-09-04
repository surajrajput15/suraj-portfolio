import React from 'react';
import { User2, MapPin, Mail, Rocket, Code2, Coffee } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

const STATS = [
  {
    icon: <Rocket className="h-5 w-5 text-violet-300" />,
    label: 'Production Projects',
    value: '2',
    sub: 'Deployed to production',
  },
  {
    icon: <Code2 className="h-5 w-5 text-violet-300" />,
    label: 'Internships',
    value: '2',
    sub: 'IBM SkillsBuild, ApexPlanet',
  },
  {
    icon: <Coffee className="h-5 w-5 text-violet-300" />,
    label: 'AI-First Builder',
    value: 'LLMs',
    sub: 'RAG · Agents · ML',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          eyebrowIcon={<User2 className="h-3.5 w-3.5" />}
          title="Who I"
          accent="Am"
          subtitle="A quick snapshot of my background, engineering philosophy, and what I'm looking for next."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Bio Card */}
          <Reveal className="lg:col-span-3 p-8 md:p-10 glass">
            <div className="space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
              <p>
                I'm <span className="font-semibold text-white">{PERSONAL_INFO.name}</span>, a
                full-stack developer focused on building production-oriented web applications and
                AI-powered products. I work across the stack — React, Next.js, Node.js,
                PostgreSQL, MongoDB — and integrate authenticated AI workflows using Groq, Google
                Gemini, and IBM watsonx.ai.
              </p>
              <p>
                My internships at <span className="font-semibold text-white">Edunet Foundation</span>{' '}
                (AICTE / IBM SkillsBuild) and{' '}
                <span className="font-semibold text-white">ApexPlanet</span> gave me hands-on
                exposure to AI application development, agentic AI, cloud platforms, and frontend
                engineering. I care about server-authoritative logic, type-safe schemas, and
                shipping interfaces that feel fast.
              </p>
              <p>
                I thrive at the intersection of{' '}
                <span className="font-semibold text-white">AI/ML and Full-Stack Development</span> —
                using Groq, LangGraph-style agents, and production-grade backends to build systems
                that scale.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span className="text-zinc-700">•</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </Reveal>

          {/* Stats Stack */}
          <div className="lg:col-span-2 space-y-3">
            {STATS.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="flex items-center gap-3 rounded-xl glass p-4 hover:border-white/[0.18] transition-all hover:shadow-[0_0_30px_hsl(262_83%_58%_/0.08)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-zinc-400">
                      {stat.label} · {stat.sub}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
