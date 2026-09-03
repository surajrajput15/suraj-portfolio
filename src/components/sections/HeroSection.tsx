import React from 'react';
import { ArrowDown, ArrowUpRight, FileText, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ResponsiveImage } from '../ui/ResponsiveImage';

interface HeroSectionProps {
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Subtle radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[280px] bg-violet-600/[0.14] blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-10 sm:gap-12">
          {/* Left: Identity & Content */}
          <div className="flex flex-col items-center sm:items-start space-y-6 text-center sm:text-left flex-1">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-white/[0.1] text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Name & Identity */}
            <div className="space-y-2">
              <p className="font-mono text-sm uppercase tracking-widest text-zinc-400 font-medium">
                {PERSONAL_INFO.name}
              </p>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Full Stack Developer <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-400 to-fuchsia-500 drop-shadow-[0_0_28px_rgba(167,139,250,0.4)]">
                  + AI
                </span>
              </h1>
            </div>

            {/* Professional Narrative */}
            <p className="text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Building production-oriented web applications and AI-powered products. Focused on full-stack architecture with React, Next.js, Node.js, PostgreSQL, MongoDB, and authenticated AI workflows with Groq and Gemini.
            </p>

            {/* Core Action CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98]"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white font-medium text-sm border border-white/[0.12] hover:border-white/[0.24] transition-all"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>Resume</span>
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

            {/* Quick Credibility Spec Matrix */}
            <div className="w-full pt-10 mt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-[#09090C] border border-white/[0.06] text-left"
                >
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-zinc-200 font-mono">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile Photo with Violet Glow Ring */}
          <div className="flex-shrink-0 self-center sm:self-auto">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto">
              {/* Outer ambient glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-violet-700/30 blur-2xl opacity-70 pointer-events-none" />
              {/* Gradient ring */}
              <div
                className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-violet-600 shadow-[0_0_40px_rgba(167,139,250,0.35)]"
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-full bg-[#0A0A0C]" />
              </div>
              {/* Photo */}
              <ResponsiveImage
                src="/profile.jpg"
                alt={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.positioning}`}
                className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full"
                layout="hero-profile"
                loading="eager"
                fetchPriority="high"
                width={256}
                height={256}
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
