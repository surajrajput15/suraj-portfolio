import { useState } from 'react';
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
import { ProjectCaseStudyModal } from './components/sections/ProjectCaseStudyModal';
import { useActiveSection } from './hooks/useActiveSection';

const SECTION_IDS = [
  'hero',
  'work',
  'experience',
  'skills',
  'education',
  'about',
  'faq',
  'contact'
] as const;

export function App() {
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);

  const activeSection = useActiveSection(SECTION_IDS);

  const handleOpenCaseStudy = (caseStudyId: string) => {
    setSelectedCaseStudyId(caseStudyId);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudyId(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F5] font-sans selection:bg-white selection:text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-white focus:text-black focus:text-sm focus:font-semibold focus:shadow-2xl"
      >
        Skip to main content
      </a>

      {/* Sticky Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Featured Tier A Projects */}
        <FeaturedProjectsSection onOpenCaseStudy={handleOpenCaseStudy} />

        {/* 3. Additional Curated Projects (Tier B) */}
        <AdditionalProjectsSection />

        {/* 4. Work Experience Timeline (with inline certs) */}
        <ExperienceSection />

        {/* 5. Skills & Technologies */}
        <SkillsSection />

        {/* 6. Education */}
        <EducationSection />

        {/* 7. About */}
        <AboutSection />

        {/* 8. FAQ */}
        <FAQSection />

        {/* 9. Contact Section (with embedded Resume block) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Case Study Modal */}
      <ProjectCaseStudyModal
        caseStudyId={selectedCaseStudyId}
        onClose={handleCloseCaseStudy}
      />
    </div>
  );
}

export default App;
