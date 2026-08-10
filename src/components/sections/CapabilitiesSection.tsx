import React from 'react';
import {
  Layout,
  Code,
  Cpu,
  Database,
  ShieldCheck,
  Cloud,
  Terminal
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Code,
  Cpu,
  Database,
  ShieldCheck,
  Cloud,
  Terminal
};

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
              Technical Capabilities
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Engineering Matrix
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Verified technical competencies across frontend, backend architecture, AI inference, cloud storage, and security hardening.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.iconName] || Code;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#09090C] border transition-all ${
                  cat.highlight
                    ? 'border-white/[0.18] bg-gradient-to-b from-[#0F0F14] to-[#09090C]'
                    : 'border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#141419] border border-white/[0.1] flex items-center justify-center text-white">
                    <Icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-200 border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.18] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
