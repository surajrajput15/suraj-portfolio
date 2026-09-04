import React from 'react';
import { ExternalLink, BookOpen, CheckCircle2, Layers } from 'lucide-react';
import { GitHubIcon } from '../ui/Icons';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

interface FeaturedProjectsSectionProps {
  onOpenCaseStudy: (caseStudyId: string) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onOpenCaseStudy
}) => {
  return (
    <section id="work" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Selected Work · Tier A"
          eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
          title="Featured Case"
          accent="Studies"
          subtitle="Full-stack web applications and AI platforms built with production-quality standards, verified architectures, and actual live deployments."
          align="left"
        />

        {/* Featured Projects List */}
        <div className="space-y-28">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <Reveal key={project.id} delay={idx * 80}>
                <article className="group relative rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.2] transition-all p-6 sm:p-10 hover:shadow-[0_0_60px_hsl(262_83%_58%_/0.08)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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
                          <ResponsiveImage
                            src={project.image}
                            alt={`${project.title} Preview`}
                            className="w-full h-full transition-transform duration-500 group-hover/img:scale-[1.03]"
                            layout="project-hero"
                            objectPosition="top"
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
                          <span className="font-mono text-xs font-bold text-violet-300 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                            PROJECT {project.number}
                          </span>
                          <span className="text-xs font-mono text-violet-400">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
