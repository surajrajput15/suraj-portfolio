import type {
  Project,
  SkillCategory,
  ExperienceItem,
  CertificationItem,
  EducationItem,
  AICapability
} from '../types';

export const PERSONAL_INFO = {
  name: 'Suraj Bhan Pratap Singh',
  positioning: 'Full Stack Developer + AI',
  tagline: 'Building production-oriented web applications and AI-powered products with modern full-stack architectures, clean typography, and robust application security.',
  about: `I am a Full Stack Developer and Computer Science undergraduate building production-oriented web applications and AI-powered products. My experience covers full-stack architecture, REST APIs, relational and document databases, and cloud deployments with React, Next.js, Node.js, PostgreSQL, and MongoDB. I focus on practical AI application development—integrating models via Groq and Google Gemini into authenticated user workflows—with disciplined application security and performance optimization.`,
  email: 'surajdona2005@gmail.com',
  phone: '+91 7209690361',
  location: 'Jaipur, Rajasthan',
  status: 'Open to Full Stack & AI Engineering Opportunities',
  githubUrl: 'https://github.com/surajrajput999',
  linkedinUrl: 'https://www.linkedin.com/in/suraj-bhan-pratap-singh-',
  resumePdfUrl: '/Suraj_Bhan_Pratap_Singh_Resume.pdf',
  quickStats: [
    { label: 'Core Focus', value: 'Full Stack + AI' },
    { label: 'Frontend & Backend', value: 'React / Next.js / Node.js' },
    { label: 'Databases & Cache', value: 'PostgreSQL / MongoDB / Redis' },
    { label: 'AI Integrations', value: 'Groq / Gemini APIs' },
  ]
};

export const AI_CAPABILITIES: AICapability[] = [
  {
    id: 'groq-llama-pipeline',
    title: 'LLM Inference & Tutoring Workflows',
    description: 'Integrated Groq Cloud LLaMA-3.1 models for note summarization, interactive tutoring, and MCQ quiz generation through authenticated APIs.',
    technologies: ['Groq API', 'LLaMA-3.1', 'Prompt Engineering', 'Structured JSON Output'],
    projectProof: 'Implemented in StudySnap for AI tutoring, summarization, and automated quiz generation from notes.',
    projectProofName: 'StudySnap',
    caseStudyId: 'studysnap'
  },
  {
    id: 'gemini-study-aids',
    title: 'Generative Study Aids & Flashcards',
    description: 'Integrated the Google Gemini API to extract concept summaries and generate on-demand study flashcards from text materials.',
    technologies: ['Google Gemini API', 'Generative AI', 'Python / Serverless', 'REST APIs'],
    projectProof: 'Powering bulleted summarization and flashcard generation in Notes Nexus Labs.',
    projectProofName: 'Notes Nexus Labs',
  },
  {
    id: 'agentic-ai-workflows',
    title: 'AI & Emerging Technologies Training',
    description: 'Completed a 6-week internship program exploring Artificial Intelligence, Agentic AI, Cloud Computing, Cybersecurity, and Quantum Computing on IBM platforms.',
    technologies: ['Artificial Intelligence', 'Agentic AI Concepts', 'IBM Cloud', 'Cybersecurity', 'IBM SkillsBuild'],
    projectProof: 'Documented in the Edunet Foundation / IBM SkillsBuild internship deliverables.',
    projectProofName: 'IBM SkillsBuild Internship',
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'studysnap',
    tier: 'featured',
    number: '01',
    title: 'StudySnap',
    tagline: 'AI-Powered Study Platform & Intelligent Revision Companion',
    description: 'Built a full-stack study platform with rich-text notes, revision scheduling, voice notes, PDF export, and installable PWA support. Integrated Groq-powered AI workflows for AI tutoring, summarization, MCQ generation, flashcards, and translation through authenticated APIs. Implemented Clerk authentication, Express APIs, Drizzle ORM with Neon PostgreSQL, Zustand persistence, Upstash Redis caching, and application security controls.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Express.js',
      'PostgreSQL (Neon)',
      'Drizzle ORM',
      'Clerk Auth',
      'Groq LLaMA-3.1',
      'Zustand',
      'Upstash Redis',
      'PWA'
    ],
    category: 'Full Stack + AI',
    image: '/projects/studysnap/dark-dashboard.png',
    gallery: [
      '/projects/studysnap/dark-dashboard.png',
      '/projects/studysnap/note-editor.png',
      '/projects/studysnap/ai-assistant.png',
      '/projects/studysnap/revision-calendar.png',
      '/projects/studysnap/voice-notes.png',
      '/projects/studysnap/mobile-dashboard.png'
    ],
    liveUrl: 'https://studysnap-sigma.vercel.app/',
    githubUrl: 'https://github.com/surajrajput999/StudySnap',
    highlights: [
      'Groq-powered AI tutoring, summarization, MCQ quiz generation, and translation via authenticated APIs',
      'Spaced repetition revision scheduling with recall difficulty ratings and streak tracking',
      'Rich-text note editor with speech-to-text input, PDF export, and PIN-locked note security',
      'Installable Progressive Web App (PWA) architecture with service worker caching',
      'Type-safe relational database schema with Drizzle ORM and Neon Serverless PostgreSQL'
    ],
    caseStudyId: 'studysnap'
  },
  {
    id: 'cartify',
    tier: 'featured',
    number: '02',
    title: 'Cartify',
    tagline: 'Full-Stack E-Commerce Platform with Hardened Checkout',
    description: 'Developed a full-stack e-commerce platform with product management, cart, checkout, orders, addresses, and admin workflows. Implemented password/OTP authentication with Google OAuth and JWT-based authorization, protected admin routes, and Razorpay payment integration. Secured checkout with server-authoritative pricing, server-side payment verification, rate limiting, Helmet, CORS, and input validation; improved performance and accessibility with lazy loading, memoization, and reusable components.',
    technologies: [
      'React 19',
      'Vite 8',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Mongoose 9',
      'Razorpay SDK',
      'Google OAuth',
      'Brevo API',
      'Tailwind CSS 4'
    ],
    category: 'Full Stack Web',
    image: '/projects/cartify/home.png',
    gallery: [
      '/projects/cartify/home.png',
      '/projects/cartify/products.png',
      '/projects/cartify/mobile-view.jpeg'
    ],
    liveUrl: 'https://cartify-hub.vercel.app/',
    githubUrl: 'https://github.com/surajrajput999/CARTIFY-APP',
    backendUrl: 'https://cartify-api-10g3.onrender.com/',
    highlights: [
      'Password/OTP authentication with Google OAuth and JWT-based authorization',
      'Server-authoritative pricing with Razorpay payment integration and signature verification',
      'Protected admin workflows for product CRUD, bulk database seeding, and image uploads',
      'Rate limiting, Helmet security headers, CORS origin allowlists, and input validation',
      'Route-level code splitting with React.lazy and memoized UI components'
    ],
    caseStudyId: 'cartify'
  }
];

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    id: 'ai-study-buddy',
    tier: 'additional',
    number: '03',
    title: 'Notes Nexus Labs (AI Study Buddy)',
    tagline: 'Generative AI Summarization & Flashcard Generator',
    description: 'An interactive web utility designed to condense lecture notes into structured bullet points and generate functional flashcards using the Google Gemini API.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python (Serverless)', 'Google Gemini API', 'Vercel'],
    category: 'AI Tooling',
    image: '/projects/ai-study-buddy/screenshot.png',
    liveUrl: 'https://notes-nexus-labs.vercel.app/',
    githubUrl: 'https://github.com/surajrajput999/AI-Study-Buddy.git',
    highlights: [
      'Text summarization workflows powered by Google Gemini API',
      'On-demand functional flashcard generator for fast concept revision',
      'Minimalist, responsive interface deployed on Vercel'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Full Stack & Frameworks',
    iconName: 'Layout',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'REST APIs', 'HTML5', 'CSS3', 'Bootstrap'],
    highlight: true
  },
  {
    title: 'Programming Languages',
    iconName: 'Code',
    skills: ['JavaScript', 'TypeScript', 'Python', 'SQL']
  },
  {
    title: 'Artificial Intelligence',
    iconName: 'Cpu',
    skills: ['Groq', 'Google Gemini', 'AI Application Development', 'Prompt Engineering', 'Agentic AI'],
    highlight: true
  },
  {
    title: 'Data & Storage',
    iconName: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM', 'Mongoose', 'Upstash Redis']
  },
  {
    title: 'Cloud & Infrastructure',
    iconName: 'Cloud',
    skills: ['IBM Cloud', 'Vercel', 'Render', 'Neon', 'Upstash Redis']
  },
  {
    title: 'Security & Authentication',
    iconName: 'ShieldCheck',
    skills: ['Clerk', 'JWT', 'Google OAuth', 'Helmet', 'CORS', 'Rate Limiting']
  },
  {
    title: 'Tools & Workflow',
    iconName: 'Terminal',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'edunet-ibm',
    company: 'Edunet Foundation',
    organization: 'AICTE / IBM SkillsBuild',
    role: 'AI & Emerging Technologies Intern',
    period: '11 May 2026 – 21 June 2026',
    location: 'Jaipur / Virtual',
    type: 'Internship',
    certificateUrl: '/certificates/edunet-ai-internship-6-week.pdf',
    certificateId: 'STU681afaf17b2831746598641',
    points: [
      'Completed a 6-week internship focused on Artificial Intelligence, Agentic AI, Cloud Computing, Cybersecurity, and Quantum Computing, with hands-on exposure to IBM SkillsBuild, IBM Cloud, and IBM BOB.',
      'Developed an industry-relevant project in Artificial Intelligence and Cloud Computing, applying emerging technology concepts to a practical use case.',
      'Gained practical understanding of AI application development, cloud technologies, cybersecurity fundamentals, and emerging computing paradigms.'
    ],
    technologies: ['Artificial Intelligence', 'Agentic AI', 'Cloud Computing', 'Cybersecurity', 'IBM SkillsBuild', 'IBM Cloud'],
    supportingCredential: {
      title: '4-week Emerging Technologies Internship',
      period: '15 May 2026 – 12 June 2026',
      issuer: 'Edunet Foundation · AICTE / IBM SkillsBuild',
      topics: ['Agentic AI', 'Cyber Security', 'Quantum Computing', 'IBM Cloud'],
      certificateUrl: '/certificates/edunet-emerging-technologies-4-week.pdf',
      certificateId: 'INTERNSHIP_177549002069d3d3e4f3903'
    }
  },
  {
    id: 'apexplanet',
    company: 'ApexPlanet Software Pvt. Ltd.',
    organization: 'Virtual Internship',
    role: 'Web Development Intern',
    period: '11 December 2025 – 24 January 2026',
    location: 'Jaipur / Virtual',
    type: 'Internship',
    certificateUrl: '/certificates/apexplanet-web-development-internship.pdf',
    certificateId: 'APSPL2524962',
    points: [
      'Completed a project-based internship applying HTML, CSS, and JavaScript through practical frontend development work.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Frontend Development']
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'naukri-prompt',
    title: 'AI Prompt Learning Journey',
    issuer: 'Naukri Campus',
    year: '2026',
    date: '3 March 2026',
    certificateId: '69a6c66ea79f2d6606a365ce',
    certificateUrl: '/certificates/naukri-ai-prompt-learning-journey.pdf',
    topics: ['Prompt Fundamentals', 'Structured Prompting', 'Advanced Prompting Techniques'],
    description: 'Completed structured learning covering prompt fundamentals, structured prompt workflows, and advanced prompt engineering strategies.'
  },
  {
    id: 'simplilearn-generative-ai',
    title: 'SkillQuest — Generative AI Literacy',
    issuer: 'Simplilearn',
    year: '2026',
    date: '21 April 2026',
    certificateId: '46904736',
    certificateUrl: '/certificates/simplilearn-generative-ai-literacy.pdf',
    description: 'Formal credential recognizing demonstrated foundational knowledge in Generative AI tools and concepts.'
  },
  {
    id: 'cisco-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    date: '15 July 2024',
    certificateUrl: '/certificates/cisco-introduction-to-cybersecurity.pdf',
    topics: ['Cyber Threats', 'Network Vulnerabilities', 'Threat Detection', 'Defensive Security'],
    description: 'Foundational certification covering threat landscape analysis, network vulnerabilities, defensive security controls, and career pathways.'
  },
  {
    id: 'edunet-emerging-tech-cert',
    title: 'Emerging Technologies Internship (4-Week)',
    issuer: 'Edunet Foundation · AICTE / IBM SkillsBuild',
    year: '2026',
    date: '15 May 2026 – 12 June 2026',
    certificateId: 'INTERNSHIP_177549002069d3d3e4f3903',
    certificateUrl: '/certificates/edunet-emerging-technologies-4-week.pdf',
    topics: ['Agentic AI', 'Cyber Security', 'Quantum Computing', 'IBM Cloud'],
    description: 'Program credential in Emerging Technologies covering Agentic AI, Cybersecurity, and Quantum Computing on IBM Cloud.'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Jagannath University',
    period: '2023 – 2027',
    location: 'Jaipur, Rajasthan',
    points: [
      'Undergraduate coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems, Web Technologies, and Software Engineering.',
      'Building production-oriented full-stack web applications and AI-driven platforms.'
    ]
  }
];
