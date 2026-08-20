import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import type { CertificateModalData } from '../../types';

interface ExperienceSectionProps {
  onViewCertificate: (cert: CertificateModalData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onViewCertificate }) => {
  return (
    <section id="experience" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-violet-400" />
              <span>Career Timeline</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Work Experience
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Verified internship and development history backed by formal credential records and project deliverables.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-[1px] before:bg-white/[0.08]">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-10 sm:pl-12 group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute left-1.5 sm:left-2 top-1.5 w-4 h-4 rounded-full bg-[#0A0A0E] border-2 border-white/40 group-hover:border-white transition-colors" />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-5">
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

                    {exp.certificateUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          onViewCertificate({
                            title: `${exp.role} Certificate`,
                            issuer: exp.organization || exp.company,
                            date: exp.period,
                            certificateId: exp.certificateId,
                            file: exp.certificateUrl!
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white border border-white/[0.1] transition-all"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Certificate ↗</span>
                      </button>
                    )}
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

                {/* Supporting Program Credential (if any) */}
                {exp.supportingCredential && (
                  <div className="p-4 rounded-xl bg-[#0F0F14] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-semibold px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                          Supporting Credential
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {exp.supportingCredential.title}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-2">
                        <span>{exp.supportingCredential.period}</span>
                        <span>•</span>
                        <span>{exp.supportingCredential.topics.join(' · ')}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onViewCertificate({
                          title: exp.supportingCredential!.title,
                          issuer: exp.supportingCredential!.issuer,
                          date: exp.supportingCredential!.period,
                          certificateId: exp.supportingCredential!.certificateId,
                          file: exp.supportingCredential!.certificateUrl
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/[0.1] transition-all self-start sm:self-auto shrink-0"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
