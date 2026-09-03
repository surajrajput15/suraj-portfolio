import React from 'react';
import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useClipboard } from '../../hooks/useClipboard';

export const Footer: React.FC = () => {
  const { hasCopied, copy } = useClipboard();

  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand & Status */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#121216] border border-white/[0.12] flex items-center justify-center font-display font-bold text-sm text-white">
                SB
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Full Stack Developer & AI engineer crafting robust web applications with modern architectures, verified security controls, and sub-second intelligent workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#ai-systems" className="hover:text-white transition-colors">
                  AI Systems
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Capabilities Matrix
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#resume" className="hover:text-white transition-colors">
                  Resume Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Direct Channels
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-400 hover:text-white group transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-400 hover:text-white group transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <button
                type="button"
                onClick={() => copy(PERSONAL_INFO.email)}
                className="w-full flex items-center justify-between text-left text-zinc-400 hover:text-white group transition-colors"
                aria-label="Copy email address"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Vite.
          </div>
          <div className="flex items-center gap-2">
            <span>Location: {PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
