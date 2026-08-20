import React from 'react';
import { Cpu, Zap, Brain, Layers, ArrowUpRight } from 'lucide-react';
import { AI_CAPABILITIES } from '../../data/portfolioData';

interface AIArchitectureSectionProps {
  onOpenCaseStudy?: (caseStudyId: string) => void;
}

export const AIArchitectureSection: React.FC<AIArchitectureSectionProps> = ({ onOpenCaseStudy }) => {
  return (
    <section id="ai-systems" className="py-24 border-t border-white/[0.08] relative bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Engineering & Pipelines</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Production AI Workflows
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Demonstrated integration of LLM inference engines, structured prompt engineering, and agentic workflows connected to real working software.
          </p>
        </div>

        {/* AI Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_CAPABILITIES.map((capability, index) => {
            const icons = [Zap, Brain, Layers];
            const Icon = icons[index % icons.length];

            return (
              <div
                key={capability.id}
                className="group p-6 rounded-2xl bg-[#0A0A0D] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#121217] border border-white/[0.1] flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {capability.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {capability.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {capability.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-xs font-mono text-zinc-400">
                    <span className="text-zinc-400">Implemented in: </span>
                    <span className="text-zinc-200 font-medium">{capability.projectProofName}</span>
                  </div>
                  {capability.caseStudyId && onOpenCaseStudy && (
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(capability.caseStudyId!)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-violet-400 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Pipeline Architecture Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h4 className="text-base font-bold text-white font-display">
              LLM Inference & Tutoring Pipeline Architecture
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              In <strong className="text-white">StudySnap</strong>, user notes are processed through an Express API middleware layer with structured system prompts sent to Groq Cloud running LLaMA-3.1 models. Structured JSON responses stream back to Zustand stores with client persistence, providing seamless note summarization and quiz generation.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2">
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400"></span>
              <span>Input: Structured Note Context</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span>Inference: Groq LLaMA-3.1 API</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Output: Quizzes, Summaries, TTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
