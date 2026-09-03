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

export interface SupportingCredential {
  title: string;
  period: string;
  issuer: string;
  topics: string[];
  certificateUrl: string;
  certificateId?: string;
  certificateDriveUrl?: string;
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
  certificateDriveUrl?: string;
  supportingCredential?: SupportingCredential;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  cgpa?: string;
  percentage?: string;
  points?: string[];
}

export interface CertificateModalData {
  title: string;
  issuer: string;
  date: string;
  certificateId?: string;
  file: string;
  driveUrl?: string;
  topics?: string[];
}
