import React from 'react';
import { Download, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, RESUME_LAST_UPDATED } from '../../data/portfolioData';

interface ResumeSectionProps {
  onOpenResume?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="resume" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-violet-400" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Resume
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-2">
              Last updated: {RESUME_LAST_UPDATED}
            </p>
          </div>
        </div>

        {/* Single-card CTA — One-click instant open */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.04] to-transparent border border-violet-400/20 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-[10px] font-mono uppercase tracking-widest text-violet-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>One-Click Instant Open</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            View my resume — opens instantly, no loading screens.
          </h3>

          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
            Official verified PDF document. Click below to open in a fullscreen viewer, download, or open in a new tab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            )}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white font-medium text-sm border border-white/[0.12] hover:border-white/[0.24] transition-all"
            >
              <ExternalLink className="w-4 h-4 text-zinc-400" />
              <span>Open in New Tab</span>
            </a>
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Suraj_Bhan_Pratap_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111115] hover:bg-[#18181F] text-white font-medium text-sm border border-white/[0.12] hover:border-white/[0.24] transition-all"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
            <span>Official Document: Suraj_Bhan_Pratap_Singh_Resume.pdf</span>
            <span>•</span>
            <span>Last updated: {RESUME_LAST_UPDATED}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
