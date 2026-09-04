import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';

const FOOTER_NAV = [
  { label: 'Home', hash: '' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Work', hash: '#work' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Education', hash: '#education' },
  { label: 'About', hash: '#about' },
  { label: 'FAQ', hash: '#faq' },
  { label: 'Contact', hash: '#contact' },
] as const;

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!hash) return; // Home handled by Link to="/"
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        window.history.replaceState(null, '', `/${hash}`);
      }
    }
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-black/30">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Top row: brand + nav */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand block */}
          <div className="text-center md:text-left space-y-2 max-w-md">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.replaceState(null, '', '/');
                }
              }}
              className="text-xl font-bold tracking-tighter text-white inline-block"
              aria-label="Suraj Bhan Pratap Singh — Home"
            >
              {PERSONAL_INFO.name}
              <span className="gradient-text">.</span>
            </Link>
            <p className="mx-auto text-sm text-zinc-400 md:mx-0">
              Full-Stack Developer & AI engineer crafting robust web applications with modern
              architectures, verified security controls, and sub-second intelligent workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{PERSONAL_INFO.status}</span>
            </div>
          </div>

          {/* Nav row */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {FOOTER_NAV.map((link) =>
              link.hash === '' ? (
                <Link
                  key="home"
                  to="/"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.history.replaceState(null, '', '/');
                    }
                  }}
                  className="text-sm text-zinc-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.hash}
                  href={`/${link.hash}`}
                  onClick={(e) => handleNav(e, link.hash)}
                  className="text-sm text-zinc-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              )
            )}
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
