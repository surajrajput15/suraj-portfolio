import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, ExternalLink } from 'lucide-react';
import { EDUCATION } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export const EducationSection: React.FC = () => {
  if (EDUCATION.length === 0) return null;

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Academic Background"
          eyebrowIcon={<GraduationCap className="h-3.5 w-3.5" />}
          title="Education"
          subtitle="Undergraduate engineering focused on full-stack systems and applied AI."
          align="center"
        />

        <Reveal>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.2] transition-all hover:shadow-[0_0_50px_hsl(262_83%_58%_/0.08)]">
            {EDUCATION.map((edu) => (
              <div key={`${edu.institution}-${edu.degree}`} className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white text-balance">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-medium text-zinc-200 mt-0.5">
                      {edu.institution}
                    </div>
                    <a
                      href="https://www.jagannathuniversity.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 backdrop-blur-sm transition-all hover:bg-violet-500/20 hover:border-violet-500/50 hover:shadow-[0_0_12px_hsl(262_83%_58%_/0.25)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>University Site</span>
                    </a>
                  </div>
                </div>

                {edu.points && edu.points.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {edu.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
                  {edu.cgpa && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 font-semibold">
                      CGPA · {edu.cgpa}
                    </span>
                  )}
                  {edu.percentage && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 font-semibold">
                      {edu.percentage}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
