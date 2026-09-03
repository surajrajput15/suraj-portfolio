import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { AIArchitectureSection } from './components/sections/AIArchitectureSection';
import { AdditionalProjectsSection } from './components/sections/AdditionalProjectsSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectCaseStudyModal } from './components/sections/ProjectCaseStudyModal';
import { CertificateViewerModal } from './components/ui/CertificateViewerModal';
import { useActiveSection } from './hooks/useActiveSection';
import type { CertificateModalData } from './types';

const SECTION_IDS = [
  'hero',
  'about',
  'work',
  'ai-systems',
  'skills',
  'experience',
  'certifications',
  'resume',
  'contact'
] as const;

export function App() {
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateModalData | null>(null);

  const activeSection = useActiveSection(SECTION_IDS);

  const handleOpenCaseStudy = (caseStudyId: string) => {
    setSelectedCaseStudyId(caseStudyId);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudyId(null);
  };

  const handleViewCertificate = (cert: CertificateModalData) => {
    setSelectedCertificate(cert);
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
  };

  const handleExploreWork = () => {
    const workElement = document.getElementById('work');
    if (workElement) {
      workElement.scrollIntoView({ behavior: 'smooth' });
    }
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
        <HeroSection onExploreWork={handleExploreWork} />

        {/* 2. About & Philosophy */}
        <AboutSection />

        {/* 3. Featured Tier A Projects */}
        <FeaturedProjectsSection onOpenCaseStudy={handleOpenCaseStudy} />

        {/* 4. AI Systems & Architectures */}
        <AIArchitectureSection onOpenCaseStudy={handleOpenCaseStudy} />

        {/* 5. Additional Curated Projects (Tier B) */}
        <AdditionalProjectsSection />

        {/* 6. Technical Capabilities Matrix */}
        <CapabilitiesSection />

        {/* 7. Work Experience Timeline */}
        <ExperienceSection onViewCertificate={handleViewCertificate} />

        {/* 8. Certifications & Education */}
        <CertificationsSection onViewCertificate={handleViewCertificate} />

        {/* 9. Interactive Resume Hub & Download */}
        <ResumeSection />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Case Study Modal */}
      <ProjectCaseStudyModal
        caseStudyId={selectedCaseStudyId}
        onClose={handleCloseCaseStudy}
      />

      {/* Verified Certificate Viewer Modal */}
      <CertificateViewerModal
        data={selectedCertificate}
        onClose={handleCloseCertificate}
      />
    </div>
  );
}

export default App;
