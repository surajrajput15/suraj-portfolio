import React from 'react';
import { Copy, Check, ArrowUpRight, FileText, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useClipboard } from '../../hooks/useClipboard';

export const ContactSection: React.FC = () => {
  const { hasCopied, copy } = useClipboard();

  return (
    <section id="contact" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-white/[0.08] space-y-2">
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold">
            Get In Touch
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Together
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
            I am currently open to full-time engineering roles, AI product development opportunities, and high-impact software projects.
          </p>
        </div>

        {/* Contact Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090C] border border-white/[0.1] shadow-2xl space-y-8">
          {/* Main Direct Email Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#111115] border border-white/[0.08]">
            <div className="space-y-1 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Direct Email Address
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white select-all">
                {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => copy(PERSONAL_INFO.email)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181820] hover:bg-[#22222C] text-white text-xs font-medium border border-white/[0.1] transition-all active:scale-95"
                aria-label="Copy email"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Full%20Stack%20%2F%20AI%20Engineering%20Opportunity`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Social / Professional Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#0F0F14] border border-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-zinc-300 group-hover:text-white">
                  <GitHubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white font-display">GitHub</div>
                  <div className="text-[11px] font-mono text-zinc-400">surajrajput999</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#0F0F14] border border-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-zinc-300 group-hover:text-white">
                  <LinkedInIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white font-display">LinkedIn</div>
                  <div className="text-[11px] font-mono text-zinc-400">Suraj Bhan Pratap</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>

            <a
              href="#resume"
              className="p-4 rounded-2xl bg-[#0F0F14] border border-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-zinc-300 group-hover:text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white font-display">Resume</div>
                  <div className="text-[11px] font-mono text-zinc-400">PDF & ATS View</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
