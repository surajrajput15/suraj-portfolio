import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export const FeaturedProjectsSection: React.FC = () => {
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
          subtitle="Full-stack web applications and AI platforms built with production-quality standards. Tap any card to dive into the full case study."
          align="left"
        />

        {/* Minimal project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURED_PROJECTS.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 80}>
              <Link
                to={`/projects/${project.id}`}
                className="group block rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.24] transition-all overflow-hidden hover:shadow-[0_0_60px_hsl(262_83%_58%_/0.1)] hover:-translate-y-0.5"
              >
                {/* Project image */}
                <div className="aspect-[16/9] overflow-hidden bg-[#050507] border-b border-white/[0.06]">
                  <ResponsiveImage
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                    layout="project-card"
                    objectPosition="top"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold text-violet-300 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                      PROJECT {project.number}
                    </span>
                    <span className="text-[11px] font-mono text-violet-400">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-pill text-[10px]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-pill text-[10px]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-primary transition-colors">
                      View Case Study
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
