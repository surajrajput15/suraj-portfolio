import React, { useEffect, useRef } from 'react';
import { X, Download, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import type { CertificateModalData } from '../../types';

interface CertificateViewerModalProps {
  data: CertificateModalData | null;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  data,
  onClose
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (data) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [data, onClose]);

  if (!data) return null;

  const downloadFilename = data.file.split('/').pop() || 'certificate.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0A0D] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#0E0E12]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Credential</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="text-[11px] font-mono text-zinc-400">{data.issuer}</span>
            </div>
            <h3 id="cert-modal-title" className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
              {data.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 pt-0.5">
              <span>Issued: {data.date}</span>
              {data.certificateId && (
                <>
                  <span>•</span>
                  <span>ID: <code className="text-zinc-300">{data.certificateId}</code></span>
                </>
              )}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-white shrink-0"
            aria-label="Close certificate viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Viewer Body */}
        <div className="p-3 sm:p-4 bg-[#050508] flex-1 overflow-hidden flex flex-col">
          <div className="relative w-full h-[62vh] sm:h-[68vh] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0E]">
            <iframe
              src={`${data.file}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title={`${data.title} - Official Certificate`}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Verified PDF Document</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={data.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#181820] hover:bg-[#22222C] text-white text-xs font-medium border border-white/[0.1] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={data.file}
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
