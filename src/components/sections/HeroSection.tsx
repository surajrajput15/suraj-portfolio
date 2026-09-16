import React from 'react';
import { ArrowDown, FileText, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreWork = () => {
    navigate('/work');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[600px] flex items-center justify-center pt-4 sm:pt-8 pb-6 sm:pb-8 overflow-hidden"
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Animated decorative orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none animate-float-slow"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          {/* Profile Photo */}
          <Reveal>
            <div className="flex justify-center mt-8">
              <div className="relative w-24 h-24 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
                <div
                  className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-violet-700/30 blur-2xl opacity-70 pointer-events-none animate-pulse-glow"
                />
                <div
                  className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-violet-600 shadow-[0_0_40px_rgba(167,139,250,0.35)]"
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-full bg-[#0A0A0C]" />
                </div>
                <img
                  src="/profile.jpg"
                  alt={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.positioning}`}
                  className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-[center_20%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          </Reveal>

          {/* Identity & Content */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-5 max-w-3xl">
            {/* Availability Badge */}
            <Reveal delay={80}>
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#111115] border border-white/[0.1] text-[10px] sm:text-xs font-mono text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{PERSONAL_INFO.status}</span>
              </div>
            </Reveal>

            {/* Intro & Name */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <Reveal delay={160}>
                <p className="font-display font-bold text-zinc-100 text-lg sm:text-xl tracking-normal">
                  Hi, I'm
                </p>
              </Reveal>

              <Reveal delay={240}>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.95] text-white leading-[1.05] text-balance">
                  {PERSONAL_INFO.name}
                </h1>
              </Reveal>
            </div>

            {/* Headline / Role */}
            <Reveal delay={320}>
              <p className="font-mono text-zinc-400 text-base sm:text-lg font-medium tracking-[0.15]">
                {PERSONAL_INFO.positioning}
              </p>
            </Reveal>

            {/* Professional Narrative */}
            <Reveal delay={400}>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl sm:max-w-2xl font-normal leading-relaxed text-pretty">
                Building production-ready web applications with AI-powered workflows.
              </p>
            </Reveal>

            {/* Tech Stack */}
            <Reveal delay={480}>
              <p className="mt-3 flex gap-2 text-zinc-400 text-xs sm:text-sm">
                React · Next.js · Node.js · TypeScript · MongoDB
              </p>
            </Reveal>

            {/* Core Action CTAs */}
            <Reveal delay={560}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={handleExploreWork}
                  className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 min-h-[48px] rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus:outline-none whitespace-nowrap"
                >
                  <span className="sm:hidden">View Work</span>
                  <span className="hidden sm:inline">Explore Selected Work</span>
                  <ArrowDown
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="w-4 h-4 shrink-0 self-center"
                  />
                </button>

                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[48px] rounded-xl bg-[#111115] hover:bg-[#18181F] text-white font-medium text-sm border border-white/[0.12] hover:border-white/[0.24] transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus:outline-none whitespace-nowrap"
                >
                  <FileText
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="w-4 h-4 text-zinc-400 shrink-0 self-center"
                  />
                  <span>View Resume</span>
                </a>
              </div>
            </Reveal>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-1 text-zinc-500 mt-8">
              <span className="text-[11px] sm:text-[10px] font-mono uppercase tracking-widest">
                Scroll
              </span>
              <ChevronDown
                strokeWidth={2.5}
                aria-hidden="true"
                className="w-4 h-4 sm:w-5 sm:h-5 animate-scroll-indicator"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};