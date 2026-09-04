import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Timeline"
          eyebrowIcon={<Briefcase className="h-3.5 w-3.5" />}
          title="Work Experience"
          subtitle="Verified internship and development history with formal credential records."
          align="left"
        />

        {/* Timeline */}
        <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-[1px] before:bg-gradient-to-b before:from-violet-500/40 before:via-fuchsia-500/30 before:to-transparent">
          {EXPERIENCES.map((exp, idx) => (
            <Reveal key={exp.id} delay={idx * 100}>
              <div className="relative pl-10 sm:pl-12 group">
                {/* Timeline Bullet Node */}
                <div className="absolute left-1.5 sm:left-2 top-1.5 w-4 h-4 rounded-full bg-[#0A0A0E] border-2 border-white/40 group-hover:border-white transition-colors" />

                <div className="p-6 sm:p-8 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-5 hover:shadow-[0_0_50px_hsl(262_83%_58%_/0.08)]">
                  {/* Role and Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-violet-300 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                          {exp.type}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-200 mt-0.5">
                        {exp.company}{' '}
                        {exp.organization && (
                          <span className="text-zinc-400 font-normal">
                            · {exp.organization}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                    {exp.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal"
                      >
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Certificate actions — direct Drive links, one click opens in new tab */}
                  {exp.certificates && exp.certificates.length > 0 && (
                    <div className="pt-3 mt-1 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                      {exp.certificates.map((cert, cIdx) => (
                        <a
                          key={cIdx}
                          href={cert.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exp.role} — ${cert.label}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/[0.1] transition-all"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>View {cert.label}</span>
                          <ExternalLink className="w-3 h-3 text-zinc-400" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
