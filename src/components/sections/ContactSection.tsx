import React from 'react';
import { Copy, Check, ArrowUpRight, FileText, Send, MapPin, Mail, Download, ExternalLink, Sparkles } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import { PERSONAL_INFO, RESUME_LAST_UPDATED } from '../../data/portfolioData';
import { useClipboard } from '../../hooks/useClipboard';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export const ContactSection: React.FC = () => {
  const { hasCopied, copy } = useClipboard();

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          eyebrowIcon={<Send className="h-3.5 w-3.5" />}
          title="Let's Build Something"
          accent="Amazing"
          subtitle="I'm actively looking for opportunities. Whether you have a question or just want to say hi, my inbox is always open!"
          align="center"
        />

        <Reveal>
          <div className="glass-strong rounded-2xl p-5 sm:p-8 md:p-10">
            {/* Email row */}
            <div className="mb-6 flex justify-center">
              <div className="group flex w-full max-w-sm items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 transition-all hover:border-primary/30 hover:bg-white/[0.05]">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground text-zinc-500">Email</p>
                  <p className="truncate text-xs sm:text-sm font-semibold text-white">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => copy(PERSONAL_INFO.email)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181820] hover:bg-[#22222C] text-white text-[11px] font-medium border border-white/[0.1] transition-all active:scale-95"
                    aria-label="Copy email"
                  >
                    {hasCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Full%20Stack%20%2F%20AI%20Engineering%20Opportunity`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-black text-[11px] font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
                    aria-label="Send email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location line */}
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
              <MapPin className="h-4 w-4" />
              <span>Based in {PERSONAL_INFO.location}</span>
            </div>

            {/* Resume pill block */}
            <div className="mb-6 mx-auto max-w-md p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.04] to-transparent border border-violet-400/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-left space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-400/30 text-[10px] font-mono uppercase tracking-widest text-violet-300 font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Curriculum Vitae</span>
                  </div>
                  <div className="text-sm font-semibold text-white">View my resume</div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Last updated: {RESUME_LAST_UPDATED}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={PERSONAL_INFO.resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Suraj_Bhan_Pratap_Singh_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111115] hover:bg-[#18181F] text-white text-[11px] font-medium border border-white/[0.12] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    <span>New Tab</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.resumePdfUrl}
                    download="Suraj_Bhan_Pratap_Singh_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111115] hover:bg-[#18181F] text-white text-[11px] font-medium border border-white/[0.12] transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social / Professional Tiles */}
            <div className="mb-6 grid gap-3 grid-cols-1 sm:grid-cols-3">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-primary/30"
              >
                <GitHubIcon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">GitHub</p>
                  <p className="text-xs text-zinc-400 truncate">surajrajput15</p>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-primary/30"
              >
                <LinkedInIcon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">LinkedIn</p>
                  <p className="text-xs text-zinc-400 truncate">Suraj Bhan Pratap</p>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Suraj_Bhan_Pratap_Singh_Resume.pdf"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-primary/30"
              >
                <FileText className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">Resume</p>
                  <p className="text-xs text-zinc-400 truncate">PDF · Direct Open</p>
                </div>
              </a>
            </div>

            {/* Bottom action row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Full%20Stack%20%2F%20AI%20Engineering%20Opportunity`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:brightness-110 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <span>Say Hello</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-7 rounded-xl border border-primary/30 bg-transparent text-sm font-semibold text-white hover:bg-primary/10 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
