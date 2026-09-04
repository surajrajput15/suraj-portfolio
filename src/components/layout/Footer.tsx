import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';

const FOOTER_NAV = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/[0.05] bg-black/30">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Top row: brand + nav */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand block */}
          <div className="text-center md:text-left space-y-2">
            <a
              href="#hero"
              className="text-xl font-bold tracking-tighter text-white inline-block"
              aria-label="Suraj Bhan Pratap Singh — Home"
            >
              {PERSONAL_INFO.name}
              <span className="gradient-text">.</span>
            </a>
            <p className="mx-auto max-w-xs text-sm text-zinc-400 md:mx-0">
              Full Stack Developer & AI engineer crafting robust web applications with modern
              architectures, verified security controls, and sub-second intelligent workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Nav row */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {FOOTER_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Hairline */}
        <div className="my-8 h-px bg-white/[0.05]" />

        {/* Bottom row: copyright + socials */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-zinc-400 text-center">
            Built with{' '}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" aria-hidden="true" /> by
            Suraj Bhan Pratap Singh · © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-primary"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-primary"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="text-zinc-400 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
