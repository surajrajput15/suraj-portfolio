import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ALLOWED_SECTIONS = new Set([
  'work',
  'experience',
  'skills',
  'education',
  'about',
  'faq',
  'contact',
]);

export function useScrollToSegment() {
  const location = useLocation();

  useEffect(() => {
    const segment = location.pathname.replace(/^\//, '').split('/')[0];
    if (!segment || !ALLOWED_SECTIONS.has(segment)) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scroll = () => {
      const el = document.getElementById(segment);
      if (!el) return;
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    };

    const timer = window.setTimeout(() => {
      requestAnimationFrame(scroll);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
}
