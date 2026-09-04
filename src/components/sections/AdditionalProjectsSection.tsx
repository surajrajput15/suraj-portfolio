import React from 'react';
import { ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { GitHubIcon } from '../ui/Icons';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { ADDITIONAL_PROJECTS } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export const AdditionalProjectsSection: React.FC = () => {
  if (ADDITIONAL_PROJECTS.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Curated Repositories · Tier B"
          eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
          title="Additional Engineering"
          accent="Work"
          subtitle="Secondary tools, ML prototypes, and agentic AI experiments spanning serverless AI integration, machine learning, and research automation."
          align="left"
        />

        {/* Curated Grid / Focus Card */}
        <div className={`grid gap-8 ${ADDITIONAL_PROJECTS.length === 1 ? 'max-w-3xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {ADDITIONAL_PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 80}>
              <div className="group rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.2] transition-all p-6 sm:p-8 flex flex-col justify-between h-full hover:shadow-[0_0_60px_hsl(262_83%_58%_/0.08)]">
                <div className="space-y-6">
                  {/* Visual Thumbnail */}
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#111115] border border-white/[0.08] relative">
                    <ResponsiveImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      layout="project-card"
                      objectPosition="top"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-violet-950/70 backdrop-blur-md border border-violet-500/25 text-[11px] font-mono text-violet-200">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300">
                      {project.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 pt-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="tech-pill text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action links */}
                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#121217] hover:bg-[#1A1A22] text-white text-xs font-medium border border-white/[0.1] transition-all"
                  >
                    <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
