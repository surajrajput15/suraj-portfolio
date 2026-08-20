import React from 'react';
import { Award, GraduationCap, Calendar, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../../data/portfolioData';
import type { CertificateModalData } from '../../types';

interface CertificationsSectionProps {
  onViewCertificate: (cert: CertificateModalData) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onViewCertificate
}) => {
  return (
    <section id="certifications" className="py-24 border-t border-white/[0.08] relative bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">
              Credentials & Academic Background
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Selected Certifications & Education
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Verified course certifications, technical program credentials, and undergraduate engineering studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Selected Certifications (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-violet-400 font-medium truncate max-w-[170px]">{cert.issuer}</span>
                      <span className="text-zinc-400">{cert.year}</span>
                    </div>

                    <h4 className="font-display text-sm font-bold text-white leading-snug">
                      {cert.title}
                    </h4>

                    {cert.description && (
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {cert.description}
                      </p>
                    )}

                    {cert.topics && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.topics.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>

                    {cert.certificateUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          onViewCertificate({
                            title: cert.title,
                            issuer: cert.issuer,
                            date: cert.date || cert.year,
                            certificateId: cert.certificateId,
                            file: cert.certificateUrl!,
                            topics: cert.topics
                          })
                        }
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 hover:text-white hover:underline transition-colors"
                      >
                        <span>View Credential</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-2">
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span>Higher Education</span>
            </div>

            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-violet-300 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                    Undergraduate Degree
                  </span>
                  <h4 className="font-display text-lg font-bold text-white pt-1">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-semibold text-zinc-300">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {edu.points && edu.points.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-white/[0.04]">
                    {edu.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
