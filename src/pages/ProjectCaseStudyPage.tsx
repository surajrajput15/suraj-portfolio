import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FEATURED_PROJECTS, ADDITIONAL_PROJECTS } from '../data/portfolioData';
import { CASE_STUDIES } from '../data/caseStudies';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { GitHubIcon } from '../components/ui/Icons';

const ALL_PROJECTS = [...FEATURED_PROJECTS, ...ADDITIONAL_PROJECTS];

export const ProjectCaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = ALL_PROJECTS.find((p) => p.id === id);
  const caseStudy = id ? CASE_STUDIES[id] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <span className="text-7xl font-extrabold gradient-text">404</span>
          <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
          <p className="text-sm text-zinc-400">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Hero / Header */}
      <section className="section-padding relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none animate-pulse-glow"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className="font-mono text-xs font-bold text-violet-300 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-mono text-violet-400">{project.category}</span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] text-balance">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed text-pretty">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-[0.98]"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white text-xs font-medium border border-white/[0.12] hover:border-white/[0.24] transition-all active:scale-[0.98]"
              >
                <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span>Source Code</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project Image */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#050507] shadow-2xl">
              <div className="h-8 bg-[#111115] border-b border-white/[0.08] px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 truncate max-w-[240px]">
                  {project.liveUrl?.replace('https://', '') || project.title.toLowerCase()}
                </div>
                <div className="w-8"></div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0E]">
                <ResponsiveImage
                  src={project.image}
                  alt={`${project.title} Preview`}
                  className="w-full h-full"
                  layout="project-hero"
                  objectPosition="top"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full Description */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl glass">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-violet-300" />
                <span className="font-mono text-xs uppercase tracking-widest text-violet-300 font-semibold">
                  Full Case Study
                </span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Key Highlights"
              eyebrowIcon={<Sparkles className="h-3.5 w-3.5" />}
              title="Engineering"
              accent="Highlights"
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, idx) => (
                <Reveal key={idx} delay={idx * 60}>
                  <div className="p-4 rounded-xl glass flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-300 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{h}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Tech Stack"
              eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
              title="Technologies"
              accent="Used"
              align="left"
            />
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Architecture (from case study) */}
      {caseStudy && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Architecture"
              eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
              title="System"
              accent="Architecture"
              align="left"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(caseStudy.architecture).map(([key, items], idx) => (
                <Reveal key={key} delay={idx * 60}>
                  <div className="p-5 rounded-2xl glass h-full">
                    <div className="text-xs font-mono uppercase tracking-widest text-violet-300 font-semibold mb-3">
                      {key}
                    </div>
                    <ul className="space-y-1.5">
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2"
                        >
                          <span className="mt-2 w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="glass-strong rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Want to see more?
              </h3>
              <p className="text-sm text-zinc-400">
                Explore the live demo or check the source code on GitHub.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white text-xs font-medium border border-white/[0.12] hover:border-white/[0.24] transition-all active:scale-[0.98]"
                >
                  <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Source Code</span>
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 text-xs font-semibold text-white hover:bg-primary/10 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Projects</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
