import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GitHubIcon } from '../ui/Icons';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { ADDITIONAL_PROJECTS } from '../../data/portfolioData';

export const AdditionalProjectsSection: React.FC = () => {
  if (ADDITIONAL_PROJECTS.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">
              Curated Repositories · Tier B
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Additional Engineering Work
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Secondary tools, ML prototypes, and agentic AI experiments spanning serverless AI integration, machine learning, and research automation.
          </p>
        </div>

        {/* Curated Grid / Focus Card */}
        <div className={`grid gap-8 ${ADDITIONAL_PROJECTS.length === 1 ? 'max-w-3xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {ADDITIONAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.2] transition-all p-6 sm:p-8 flex flex-col justify-between"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};
