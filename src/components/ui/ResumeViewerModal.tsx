import React, { useEffect, useRef } from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  lastUpdated?: string;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  onClose,
  resumeUrl,
  lastUpdated
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const downloadFilename = resumeUrl.split('/').pop() || 'resume.pdf';

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] bg-[#0A0A0D] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#0E0E12]">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-violet-400" />
                <span>Curriculum Vitae</span>
              </span>
              {lastUpdated && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                  <span className="text-[11px] font-mono text-zinc-400">Updated {lastUpdated}</span>
                </>
              )}
            </div>
            <h3 id="resume-modal-title" className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
              Suraj Bhan Pratap Singh — Resume
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 pt-0.5">
              <span>Full Stack Developer + AI</span>
              <span>•</span>
              <span>Jaipur, Rajasthan</span>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-white shrink-0"
            aria-label="Close resume viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Viewer Body */}
        <div className="p-3 sm:p-4 bg-[#050508] flex-1 overflow-hidden flex flex-col">
          <div className="relative w-full h-[70vh] sm:h-[76vh] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0E]">
            <iframe
              key={resumeUrl}
              src={`${resumeUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title="Suraj Bhan Pratap Singh - Resume"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Verified Document</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#181820] hover:bg-[#22222C] text-white text-xs font-medium border border-white/[0.1] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={resumeUrl}
              download={downloadFilename}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
