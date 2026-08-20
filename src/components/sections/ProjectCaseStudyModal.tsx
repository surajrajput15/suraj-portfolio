import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Layers, ShieldCheck, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GitHubIcon } from '../ui/Icons';
import { CASE_STUDIES } from '../../data/caseStudies';

interface ProjectCaseStudyModalProps {
  caseStudyId: string | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  caseStudyId,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'engineering' | 'gallery'>('overview');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const caseStudy = caseStudyId ? CASE_STUDIES[caseStudyId] : null;

  // Handle escape key + focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    if (caseStudyId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [caseStudyId, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0D] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-[#0E0E12]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Technical Case Study
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="text-[11px] font-mono text-violet-400">Verified Architecture</span>
            </div>
            <h3 id="case-study-title" className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {caseStudy.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
              {caseStudy.subtitle}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 bg-[#09090C] border-b border-white/[0.06] flex gap-2 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview & Features', icon: Sparkles },
            { id: 'architecture', label: 'System Architecture', icon: Layers },
            { id: 'engineering', label: 'Security & Engineering', icon: ShieldCheck },
            { id: 'gallery', label: 'Screenshots & Gallery', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                    The Problem
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.problem}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Engineered Solution
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-display text-lg font-bold text-white">
                  Verified Feature Breakdown
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {caseStudy.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#0F0F14] border border-white/[0.06] space-y-1"
                    >
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                        <span>{feat.title}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pl-3.5 font-normal">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                    Frontend Layer
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-normal">
                    {caseStudy.architecture.frontend.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
                    Backend & API Services
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-normal">
                    {caseStudy.architecture.backend.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    Database & Cache
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-normal">
                    {caseStudy.architecture.database.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {caseStudy.architecture.aiServices && (
                  <div className="p-5 rounded-2xl bg-[#111115] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      AI & Inference Pipelines
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 font-normal">
                      {caseStudy.architecture.aiServices.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ENGINEERING & SECURITY */}
          {activeTab === 'engineering' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h4 className="font-display text-base font-bold text-white">
                  Technical Challenges & Solutions
                </h4>
                <div className="space-y-3">
                  {caseStudy.engineeringHighlights.map((eng, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#111115] border border-white/[0.06] space-y-1"
                    >
                      <div className="text-sm font-semibold text-zinc-100 font-display">
                        {eng.title}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                        {eng.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-display text-base font-bold text-white">
                  Security Hardening Checklist
                </h4>
                <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] space-y-2">
                  {caseStudy.securityHardening.map((sec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-normal">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.screenshots.map((shot, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl bg-[#111115] border border-white/[0.08] overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={shot.url}
                        alt={shot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="text-xs font-semibold text-white">{shot.title}</div>
                      <div className="text-[11px] text-zinc-400 leading-snug">{shot.caption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-zinc-400">
            Repository status: <span className="text-emerald-400">Verified & Maintained</span>
          </div>
          <div className="flex items-center gap-3">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live App</span>
              </a>
            )}
            <a
              href={caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#181820] hover:bg-[#22222C] text-white text-xs font-medium border border-white/[0.1] transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
