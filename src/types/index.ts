export interface Project {
  id: string;
  tier: 'featured' | 'additional';
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl: string;
  backendUrl?: string;
  highlights: string[];
  caseStudyId?: string;
}

export interface CaseStudyScreenshot {
  url: string;
  title: string;
  caption: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  liveUrl?: string;
  githubUrl: string;
  backendUrl?: string;
  problem: string;
  solution: string;
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiServices?: string[];
    security: string[];
    devops: string[];
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  engineeringHighlights: {
    title: string;
    description: string;
  }[];
  securityHardening: string[];
  screenshots: CaseStudyScreenshot[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
  highlight?: boolean;
}

export interface SupportingCredential {
  title: string;
  period: string;
  issuer: string;
  topics: string[];
  certificateUrl: string;
  certificateId?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  organization?: string;
  period: string;
  location: string;
  type: string;
  points: string[];
  technologies: string[];
  certificateUrl?: string;
  certificateId?: string;
  supportingCredential?: SupportingCredential;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  certificateId?: string;
  topics?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  points: string[];
}

export interface AICapability {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  projectProof: string;
  projectProofName: string;
  caseStudyId?: string;
}

export interface CertificateModalData {
  title: string;
  issuer: string;
  date: string;
  certificateId?: string;
  file: string;
  topics?: string[];
}
