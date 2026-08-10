import React from 'react';
import { ExternalLink, BookOpen, CheckCircle2 } from 'lucide-react';
import { GitHubIcon } from '../ui/Icons';
import { FEATURED_PROJECTS } from '../../data/portfolioData';

interface FeaturedProjectsSectionProps {
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onOpenCaseStudy
}) => {
  return (
    <section id="work" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
              Selected Work · Tier A
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Full-stack web applications and AI platforms built with production-quality standards, verified architectures, and actual live deployments.
          </p>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-28">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <article
                key={project.id}
                className="group relative rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.2] transition-all p-6 sm:p-10"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Showcase (60% screen weight) */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#050507] shadow-2xl group/img">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-8 bg-[#111115] border-b border-white/[0.08] px-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px]">
                          {project.liveUrl?.replace('https://', '') || project.title.toLowerCase()}
                        </div>
                        <div className="w-8"></div>
                      </div>

                      {/* Main Screenshot with Subtle Zoom Hover */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0E]">
                        <img
                          src={project.image}
                          alt={`${project.title} Preview`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-6">
                          <button
                            type="button"
                            onClick={() => onOpenCaseStudy(project.caseStudyId || project.id)}
                            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold shadow-lg hover:bg-zinc-200 transition-all flex items-center gap-2"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>View Full Case Study & Architecture</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info & Engineering Highlights */}
                  <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                          PROJECT {project.number}
                        </span>
                        <span className="text-xs font-mono text-blue-400">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm font-medium text-zinc-300">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Engineering Capabilities & Features */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Key Engineering Highlights
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-normal"
                          >
                            <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-pill text-[11px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/[0.08]">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121217] hover:bg-[#1A1A22] text-white text-xs font-medium border border-white/[0.1] hover:border-white/[0.2] transition-all"
                      >
                        <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Source Code</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onOpenCaseStudy(project.caseStudyId || project.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Case Study Details ↗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
