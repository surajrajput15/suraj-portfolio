import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { AdditionalProjectsSection } from './components/sections/AdditionalProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { AboutSection } from './components/sections/AboutSection';
import { FAQSection } from './components/sections/FAQSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useActiveSection } from './hooks/useActiveSection';
import {
  useScrollToSegment,
  ALLOWED_SECTIONS,
} from './hooks/useScrollToSegment';

const HOME_SECTION_IDS = [
  'hero',
  'work',
  'experience',
  'skills',
  'education',
  'about',
  'faq',
  'contact',
] as const;

function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <FeaturedProjectsSection />
      <AdditionalProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

function SectionRoute() {
  const { section } = useParams<{ section: string }>();
  useScrollToSegment();
  if (!section || !ALLOWED_SECTIONS.has(section)) {
    return <NotFoundPage />;
  }
  return <HomePage />;
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const location = useLocation();
  const firstSegment = location.pathname.replace(/^\//, '').split('/')[0] ?? '';
  const isHome =
    location.pathname === '/' || ALLOWED_SECTIONS.has(firstSegment);
  const activeSection = useActiveSection(HOME_SECTION_IDS, isHome);

  useEffect(() => {
    if (!isHome) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, isHome]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F5] font-sans selection:bg-white selection:text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-white focus:text-black focus:text-sm focus:font-semibold focus:shadow-2xl"
      >
        Skip to main content
      </a>

      <Navbar activeSection={isHome ? activeSection : ''} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectCaseStudyPage />} />
        <Route path="/:section" element={<SectionRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isHome && <Footer />}
    </div>
  );
}

export default App;
