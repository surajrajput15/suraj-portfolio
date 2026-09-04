import React from 'react';
import { Mail, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';

const FOOTER_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Work', path: '/work' },
  { label: 'Skills', path: '/skills' },
  { label: 'Education', path: '/education' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const;

const SOCIALS = [
  { label: 'GitHub', href: PERSONAL_INFO.githubUrl, icon: <GitHubIcon className="h-4 w-4" /> },
  {
    label: 'LinkedIn',
    href: PERSONAL_INFO.linkedinUrl,
    icon: <LinkedInIcon className="h-4 w-4" />,
  },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, icon: <Mail className="h-4 w-4" /> },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/[0.05] bg-black/30">
      {/* Subtle top-edge gradient decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-14">
        {/* Top row: brand + nav */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between md:items-start">
          {/* Brand block */}
          <div className="text-center md:text-left max-w-sm space-y-3">
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold tracking-tighter text-white inline-block"
              aria-label="Suraj Bhan Pratap Singh — Home"
            >
              {PERSONAL_INFO.name}
              <span className="gradient-text">.</span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Full-Stack Developer & AI engineer crafting robust web applications with modern
              architectures, verified security controls, and sub-second intelligent workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Nav row */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-3"
          >
            {FOOTER_NAV.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs sm:text-sm text-zinc-400 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hairline */}
        <div className="my-8 h-px bg-white/[0.05]" />

        {/* Bottom row: copyright + socials */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 text-center">
            Built with{' '}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" aria-hidden="true" /> by
            Suraj Bhan Pratap Singh · © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === 'Email' ? undefined : '_blank'}
                rel={s.label === 'Email' ? undefined : 'noopener noreferrer'}
                aria-label={s.label}
                className="p-2 rounded-lg text-zinc-400 transition-all hover:text-primary hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
              >
                {s.icon}
                <span className="sr-only">{s.label}</span>
              </a>
            ))}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-primary hover:bg-white/[0.04] transition-all focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
