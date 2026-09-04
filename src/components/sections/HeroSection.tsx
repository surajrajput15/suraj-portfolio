import React from 'react';
import { ArrowDown, ArrowUpRight, FileText, Terminal, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Animated decorative orbs (reference-aligned) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 blur-[140px] pointer-events-none animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Profile Photo on Top — centered, fully visible */}
          <Reveal>
            <div className="flex justify-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48">
                {/* Outer ambient glow */}
                <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-violet-700/30 blur-2xl opacity-70 pointer-events-none animate-pulse-glow" />
                {/* Gradient ring */}
                <div
                  className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-violet-600 shadow-[0_0_40px_rgba(167,139,250,0.35)]"
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-full bg-[#0A0A0C]" />
                </div>
                {/* Photo */}
                <img
                  src="/profile.jpg"
                  alt={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.positioning}`}
                  className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width={192}
                  height={192}
                />
              </div>
            </div>
          </Reveal>

          {/* Identity & Content — all centered */}
          <div className="flex flex-col items-center space-y-6 max-w-3xl">
            {/* Availability Badge */}
            <Reveal delay={80}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-white/[0.1] text-xs font-mono text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{PERSONAL_INFO.status}</span>
              </div>
            </Reveal>

            {/* Name & Identity */}
            <Reveal delay={160} className="space-y-2">
              <p className="font-mono text-sm uppercase tracking-widest text-zinc-400 font-medium">
                {PERSONAL_INFO.name}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Full Stack Developer{' '}
                <span className="gradient-text drop-shadow-[0_0_28px_rgba(167,139,250,0.4)]">
                  + AI
                </span>
              </h1>
            </Reveal>

            {/* Professional Narrative */}
            <Reveal delay={240}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Building production-oriented web applications and AI-powered products. Focused on
                full-stack architecture with React, Next.js, Node.js, PostgreSQL, MongoDB, and
                authenticated AI workflows with Groq and Gemini.
              </p>
            </Reveal>

            {/* Core Action CTAs */}
            <Reveal delay={320}>
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const workElement = document.getElementById('work');
                    if (workElement) {
                      workElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98]"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white font-medium text-sm border border-white/[0.12] hover:border-white/[0.24] transition-all active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4 text-zinc-400" />
                  <span>View Resume</span>
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-zinc-400 hover:text-white text-sm font-medium hover:bg-white/[0.04] transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator (reference-aligned) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 hidden sm:flex flex-col items-center gap-1 text-zinc-500">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
};
