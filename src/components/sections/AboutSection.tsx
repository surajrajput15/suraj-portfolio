import React from 'react';
import { Terminal, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Editorial Profile Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#09090C] border border-white/[0.1] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#121217] border border-white/[0.12] flex items-center justify-center font-display font-extrabold text-xl text-white">
                  SB
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-mono text-blue-400">
                    {PERSONAL_INFO.positioning}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Education</span>
                  <span className="text-white font-medium">B.Tech CSE (2023–2027)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">University</span>
                  <span className="text-white font-medium">Jagannath University</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Based In</span>
                  <span className="text-white font-medium">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Specialization</span>
                  <span className="text-white font-medium">Full Stack & AI Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Concise Technical Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                Engineering Philosophy
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Building Software with Purpose & Rigor
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {PERSONAL_INFO.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0C0C10] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Production-First Mindset</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Focusing on type safety, server-authoritative validations, clean database schemas, and maintainable modular architecture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0C0C10] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Practical AI Integration</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Embedding low-latency LLMs directly into user workflows where they solve real retention, summarization, and automation needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
