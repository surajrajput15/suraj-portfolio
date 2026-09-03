import type {
  Project,
  ExperienceItem,
  EducationItem,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Suraj Bhan Pratap Singh',
  positioning: 'Full Stack Developer + AI',
  email: 'surajdona2005@gmail.com',
  phone: '+917209690361',
  location: 'Jaipur, Rajasthan',
  status: 'Open to Full Stack & AI Engineering Opportunities',
  githubUrl: 'https://github.com/surajrajput15',
  linkedinUrl: 'https://www.linkedin.com/in/suraj-bhan-pratap-singh-891727293',
  resumePdfUrl: '/Suraj_Bhan_Pratap_Singh_Resume.pdf',
};

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
    githubUrl: 'https://github.com/surajrajput15/StudySnap',
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
      '/projects/cartify/mobile-view.png'
    ],
    liveUrl: 'https://cartify-hub.vercel.app/',
    githubUrl: 'https://github.com/surajrajput15/CARTIFY-APP',
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
    githubUrl: 'https://github.com/surajrajput15/AI-Study-Buddy.git',
    highlights: [
      'Text summarization workflows powered by Google Gemini API',
      'On-demand functional flashcard generator for fast concept revision',
      'Minimalist, responsive interface deployed on Vercel'
    ]
  },
  {
    id: 'researchgpt',
    tier: 'additional',
    number: '04',
    title: 'ResearchGPT',
    tagline: 'Agentic AI Research Agent using IBM Granite & Langflow',
    description: 'An agentic AI research assistant designed to streamline literature discovery, document analysis, and research summarization. Orchestrated through Langflow with IBM Granite foundation models on watsonx.ai, combining retrieval-augmented generation (RAG) with structured research workflows. Developed for Problem Statement No. 1 (Research Agent) under the IBM SkillsBuild / AICTE 2026 program.',
    technologies: ['IBM Granite', 'IBM watsonx.ai', 'Langflow', 'RAG', 'Agentic AI', 'Python'],
    category: 'Agentic AI',
    image: '/projects/researchgpt/architecture-blueprint.png',
    githubUrl: 'https://github.com/surajrajput15/ResearchGPT',
    highlights: [
      'Agentic AI + RAG architecture orchestrating research retrieval before LLM reasoning',
      'Langflow workflow layer routing queries to literature sources and document context',
      'IBM Granite reasoning layer generating structured summaries, insights, and references'
    ]
  },
  {
    id: 'sanjivani',
    tier: 'additional',
    number: '05',
    title: 'Sanjivani — Diabetes Predictor',
    tagline: 'Machine Learning Health Risk Prediction Web App',
    description: 'An AI-powered diabetes prediction web application built with Scikit-Learn and Streamlit. Trained on the Pima Indians Diabetes Dataset (768 samples, 8 health indicators), the app returns an instant diabetes risk prediction from user health parameters — making early screening accessible, fast, and accurate.',
    technologies: ['Python', 'Scikit-Learn', 'Streamlit', 'Pandas', 'NumPy', 'Pima Indians Dataset'],
    category: 'ML / AI',
    image: '/projects/sanjivani/app-preview.png',
    liveUrl: 'https://sanjivani-diabetes-predictor-an6yfh5zfnx55h9rqybtjx.streamlit.app/',
    githubUrl: 'https://github.com/surajrajput15/Sanjivani-Diabetes-Predictor',
    highlights: [
      'Trained ML classification model achieving ~78–85% accuracy on 768 patient records',
      'Instant risk prediction from 8 clinical health indicators via clean Streamlit UI',
      'Responsive, lightweight browser experience deployed on Streamlit Cloud'
    ]
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
    certificates: [
      {
        label: 'Certificate 1',
        driveUrl: 'https://drive.google.com/file/d/1HQZiZGNvkKlKQxNDCIlG9PI9ULKCFi2B/view?usp=sharing'
      },
      {
        label: 'Certificate 2',
        driveUrl: 'https://drive.google.com/file/d/1tKWzr-TlaMmF-ZAzmxnudhp18DkkTknz/view?usp=sharing'
      }
    ],
    points: [
      'Completed a 6-week internship focused on Artificial Intelligence, Agentic AI, Cloud Computing, Cybersecurity, and Quantum Computing, with hands-on exposure to IBM SkillsBuild, IBM Cloud, and IBM BOB.',
      'Developed an industry-relevant project in Artificial Intelligence and Cloud Computing, applying emerging technology concepts to a practical use case.',
      'Gained practical understanding of AI application development, cloud technologies, cybersecurity fundamentals, and emerging computing paradigms.'
    ],
    technologies: ['Artificial Intelligence', 'Agentic AI', 'Cloud Computing', 'Cybersecurity', 'IBM SkillsBuild', 'IBM Cloud'],
  },
  {
    id: 'apexplanet',
    company: 'ApexPlanet Software Pvt. Ltd.',
    organization: 'Virtual Internship',
    role: 'Web Development Intern',
    period: '11 December 2025 – 24 January 2026',
    location: 'Jaipur / Virtual',
    type: 'Internship',
    certificates: [
      {
        label: 'Certificate',
        driveUrl: 'https://drive.google.com/file/d/1GyYFQDOGHaqfdZNNbTuKY1XpNmJlgF13/view?usp=sharing'
      }
    ],
    points: [
      'Completed a project-based internship applying HTML, CSS, and JavaScript through practical frontend development work.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Frontend Development']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Jagannath University',
    period: '2023 – 2027',
    location: 'Jaipur, Rajasthan',
    cgpa: '8.4 / 10',
    points: [
      'Undergraduate coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems, Web Technologies, and Software Engineering.',
      'Building production-oriented full-stack web applications and AI-driven platforms.'
    ]
  },
  {
    degree: 'Class 12th (BSEB) — 77.6%',
    institution: 'T.S. College Hisua',
    period: '2023',
    location: 'Bihar',
  },
  {
    degree: 'Class 10th (BSEB) — 87.6%',
    institution: 'Inter School Hisua',
    period: '2021',
    location: 'Bihar',
  }
];

export const RESUME_LAST_UPDATED = 'August 2026';
