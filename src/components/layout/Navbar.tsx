import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { label: 'Work', path: '/work' },
  { label: 'Experience', path: '/experience' },
  { label: 'Skills', path: '/skills' },
  { label: 'Education', path: '/education' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const;

const linkClass = (isActive: boolean) =>
  `px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
    isActive
      ? 'bg-white text-black font-semibold shadow-sm'
      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
  }`;

const mobileLinkClass = (isActive: boolean) =>
  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white text-black font-semibold'
      : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
  }`;

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(60);
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [isScrolled]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
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
    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>('a[href], button');
      first?.focus();
    }, 50);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useBodyScrollLock(mobileMenuOpen);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 animate-navbar-mount ${
        isScrolled
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"
            aria-label="Suraj Bhan Pratap Singh Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111115] border border-white/[0.12] flex items-center justify-center font-display font-bold text-sm text-white group-hover:border-white/[0.28] transition-colors">
              SB
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — single pill containing all links + Resume */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A0A0C]/80 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.path.replace('/', '');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={linkClass(isActive)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in a new tab"
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 text-zinc-400 hover:text-white hover:bg-white/[0.04] inline-flex items-center gap-1.5"
            >
              <FileText className="w-3 h-3" />
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0E0E12] border border-white/[0.08] text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu — solid dark black background */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="md:hidden fixed inset-x-0 bg-[#050505] border-b border-white/[0.1] px-6 py-6 transition-all animate-fade-in shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto"
          style={{ top: headerHeight }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.path.replace('/', '');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={mobileLinkClass(isActive)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-2.5">
              <a
                href={PERSONAL_INFO.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF in a new tab"
                className="px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
