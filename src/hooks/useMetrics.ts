import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisitorArrival, recordPathNavigation } from '../utils/siteMetrics';

const SECTION_TITLES: Record<string, string> = {
  hero: 'Hero / Introduction',
  work: 'Work & Featured Projects',
  experience: 'Experience & Internships',
  skills: 'Technical Skills & Technologies',
  education: 'Education & Degree',
  about: 'About Me & Engineering Journey',
  faq: 'Frequently Asked Questions (FAQ)',
  contact: 'Contact & Let\'s Build',
};

/**
 * Hook to automatically initialize site metrics on initial visit
 * and capture all subsequent URL path and section transitions.
 */
export function useMetrics(activeSection?: string) {
  const location = useLocation();
  const initialRecordedRef = useRef(false);
  const lastPathRef = useRef<string>('');
  const lastSectionRef = useRef<string>('');
  const sectionTimerRef = useRef<any>(null);

  // 1. Capture Route & URL Path Navigation (Clicks on Navbar, Case Studies, etc.)
  useEffect(() => {
    const currentPath = location.pathname;

    // Initial visit: send full visitor arrival card
    if (!initialRecordedRef.current) {
      initialRecordedRef.current = true;
      lastPathRef.current = currentPath;
      recordVisitorArrival(currentPath);
      return;
    }

    // Subsequent navigation to any URL path
    if (currentPath !== lastPathRef.current) {
      lastPathRef.current = currentPath;

      let pageTitle = document.title || currentPath;
      const cleanPath = currentPath.replace(/^\//, '');

      if (currentPath === '/') {
        pageTitle = 'Home (Overview)';
      } else if (SECTION_TITLES[cleanPath]) {
        pageTitle = SECTION_TITLES[cleanPath];
      } else if (currentPath.startsWith('/projects/')) {
        const projectId = currentPath.replace('/projects/', '');
        pageTitle = `Case Study: ${projectId.toUpperCase()}`;
      }

      recordPathNavigation(currentPath, pageTitle);
    }
  }, [location.pathname]);

  // 2. Capture Section Viewing during on-page scroll (debounced to avoid spam)
  useEffect(() => {
    if (!activeSection || activeSection === 'hero') return;

    if (sectionTimerRef.current) {
      clearTimeout(sectionTimerRef.current);
    }

    // Only dispatch if visitor stays on the section for more than 2 seconds (reading section)
    sectionTimerRef.current = setTimeout(() => {
      if (activeSection !== lastSectionRef.current && activeSection !== lastPathRef.current.replace(/^\//, '')) {
        lastSectionRef.current = activeSection;
        const sectionTitle = SECTION_TITLES[activeSection] || `#${activeSection}`;
        recordPathNavigation(`/${activeSection}`, `Scrolled to: ${sectionTitle}`);
      }
    }, 2000);

    return () => {
      if (sectionTimerRef.current) {
        clearTimeout(sectionTimerRef.current);
      }
    };
  }, [activeSection]);
}
