import type { CaseStudy } from '../types';

export const CASE_STUDIES: Record<string, CaseStudy> = {
  studysnap: {
    id: 'studysnap',
    title: 'StudySnap',
    subtitle: 'AI-Powered Study Platform & Intelligent Revision Companion',
    summary: 'A full-stack learning platform integrating Groq LLaMA-3.1 models, rich-text note taking, audio recording with transcription, spaced repetition scheduling, and PWA support.',
    liveUrl: 'https://studysnap-sigma.vercel.app/',
    githubUrl: 'https://github.com/surajrajput15/StudySnap',
    problem: 'Students frequently juggle fragmented tools—switching between separate apps for note-taking, flashcard generation, audio recording, and generic AI chat interfaces. This leads to broken revision schedules and lost contextual retention.',
    solution: 'Designed and engineered a unified study platform where structured notes directly feed into AI tutoring, automated quiz generators, audio transcription, and a spaced repetition revision calendar.',
    architecture: {
      frontend: [
        'Next.js 16 (App Router) & React 19',
        'TypeScript for end-to-end type safety',
        'Zustand for predictable client-side state management & local persistence',
        'Tailwind CSS & dark-first interface design',
        'Progressive Web App (PWA) with Service Worker caching'
      ],
      backend: [
        'Express.js REST API service architecture',
        'Clerk authentication & session verification middleware',
        'Structured input validation & error handling'
      ],
      database: [
        'PostgreSQL hosted on Neon Serverless',
        'Drizzle ORM for type-safe schema modeling and migrations',
        'Upstash Redis for session and response caching'
      ],
      aiServices: [
        'Groq API integration running LLaMA-3.1 models',
        'Structured prompt pipelines for automatic note summarization',
        'MCQ quiz generator with answer explanations',
        'Flashcard extraction and Hindi ↔ English translation'
      ],
      security: [
        'Clerk OAuth and stateless JWT session verification',
        'PIN-locked personal notes protection',
        'Helmet HTTP security headers & CSRF protection',
        'Express rate-limiting on API endpoints'
      ],
      devops: [
        'Vercel edge hosting with automated CI/CD',
        'Service Worker asset caching for offline resilience'
      ]
    },
    keyFeatures: [
      {
        title: 'Groq LLaMA-3.1 AI Tutoring & Workflows',
        description: 'Automated note summarization, multiple-choice quiz generation with answer keys, interactive flashcards, and language translation via authenticated endpoints.'
      },
      {
        title: 'Spaced Repetition Scheduler',
        description: 'Visual revision calendar based on spaced repetition intervals. Allows students to rate recall difficulty (Easy, Medium, Hard) and tracks continuous study streaks.'
      },
      {
        title: 'Rich-Text Notes & PIN Security',
        description: 'Auto-saving editor with rich formatting, hashtag categorization, PDF export, markdown import, and PIN lock on sensitive notes.'
      },
      {
        title: 'Voice Notes with Transcription',
        description: 'In-browser audio recording with pause/resume, variable playback speeds (0.5×–2.0×), and real-time speech-to-text transcription linked to notes.'
      },
      {
        title: 'Installable Progressive Web App (PWA)',
        description: 'Installable on mobile and desktop devices with service worker caching for offline asset and note availability.'
      }
    ],
    engineeringHighlights: [
      {
        title: 'Low-Latency LLM Integration',
        description: 'Connected Groq Cloud inference to deliver rapid quiz generation and note summaries directly within the note editor context.'
      },
      {
        title: 'Type-Safe Data Flow with Drizzle ORM',
        description: 'Modeled relational PostgreSQL schemas for notes, folders, and revision logs with complete TypeScript inference from database to UI components.'
      },
      {
        title: 'Client State Persistence & Cache Layer',
        description: 'Used Zustand with local persistence and Upstash Redis caching to ensure notes and active revision states remain reliable across sessions.'
      }
    ],
    securityHardening: [
      'Clerk JWT token verification on all protected Express routes',
      'PIN protection for private notes',
      'Rate-limiting middleware on AI generation routes to prevent quota exhaustion',
      'Strict Helmet headers mitigating cross-site scripting (XSS) and clickjacking',
      'Input sanitization to prevent SQL injection and malformed payloads'
    ],
    screenshots: [
      {
        url: '/projects/studysnap/dark-dashboard.png',
        title: 'Main Dashboard (Dark Theme)',
        caption: 'Central study dashboard showing recent notes, AI study tools, folders, and statistics.'
      },
      {
        url: '/projects/studysnap/note-editor.png',
        title: 'Rich-Text Note Editor',
        caption: 'Auto-saving rich-text editor with speech-to-text and PIN protection.'
      },
      {
        url: '/projects/studysnap/ai-assistant.png',
        title: 'SnapAI Intelligence Hub',
        caption: 'AI tutoring assistant generating summaries, quizzes, and flashcards.'
      },
      {
        url: '/projects/studysnap/revision-calendar.png',
        title: 'Spaced Repetition Calendar',
        caption: 'Visual revision planner with recall difficulty algorithms and streak tracking.'
      },
      {
        url: '/projects/studysnap/voice-notes.png',
        title: 'Voice Notes & Audio Transcription',
        caption: 'Built-in audio recorder with variable playback speeds and live transcript.'
      },
      {
        url: '/projects/studysnap/mobile-dashboard.png',
        title: 'Mobile PWA Experience',
        caption: 'Responsive mobile layout optimized for portable study sessions.'
      }
    ]
  },
  cartify: {
    id: 'cartify',
    title: 'Cartify',
    subtitle: 'Full-Stack E-Commerce Platform with Hardened Checkout',
    summary: 'A production-oriented full-stack e-commerce system featuring password/OTP authentication with Google OAuth, Razorpay payment verification, server-authoritative pricing, and role-based administration.',
    liveUrl: 'https://cartify-hub.vercel.app/',
    githubUrl: 'https://github.com/surajrajput15/CARTIFY-APP',
    backendUrl: 'https://cartify-api-10g3.onrender.com/',
    problem: 'Many e-commerce tutorial projects rely on client-side calculations for totals and discounts, creating serious price tampering vulnerabilities, and lack proper route protection or security headers.',
    solution: 'Engineered a full-stack e-commerce architecture where all pricing, cart totals, and payment verifications are computed authoritatively on the backend with Razorpay signature verification and protected admin routes.',
    architecture: {
      frontend: [
        'React 19 & Vite 8 build pipeline',
        'Tailwind CSS 4 utility styling',
        'React Router DOM 7 for client-side routing',
        'Axios with authorization interceptors',
        'Lucide React for iconography',
        'React.lazy & Suspense for route-level code splitting'
      ],
      backend: [
        'Node.js & Express 4 REST API server',
        'Multer middleware for multipart image uploads',
        'Centralized service layer separating business logic from routes',
        'Global error handling middleware with structured responses'
      ],
      database: [
        'MongoDB Atlas cloud database',
        'Mongoose 9 ODM with indexed schemas (User, Product, Order, Address)'
      ],
      security: [
        'Razorpay payment integration with HMAC-SHA256 signature verification',
        'Server-authoritative price & order total calculation',
        'Helmet HTTP header protection against XSS and clickjacking',
        'express-rate-limit configured for auth and general API routes',
        'CORS origin allowlist configuration',
        'Server-side input validation and payload sanitization'
      ],
      devops: [
        'Frontend edge deployed on Vercel',
        'Backend REST API hosted on Render',
        'MongoDB Atlas cloud database cluster'
      ]
    },
    keyFeatures: [
      {
        title: 'Authentication & Session Authorization',
        description: 'Supports email/password authentication, Google OAuth verification, and passwordless email OTP, with JWT-based session authorization.'
      },
      {
        title: 'Server-Authoritative Razorpay Checkout',
        description: 'All cart pricing and line-item totals are computed exclusively on the server before generating Razorpay orders, verified via HMAC-SHA256 signatures.'
      },
      {
        title: 'Catalog & Shopping Experience',
        description: 'Product catalog with search, category filtering, persistent shopping cart, address book CRUD, and order history.'
      },
      {
        title: 'Protected Admin Dashboard',
        description: 'Role-guarded administration interface with product CRUD, Multer image upload handling, and bulk catalog seeding.'
      },
      {
        title: 'Performance & UX Polish',
        description: 'Route-level code splitting (`React.lazy`), memoized UI rendering, keyboard navigation, and responsive layouts.'
      }
    ],
    engineeringHighlights: [
      {
        title: 'Tamper-Resistant Payment Pipeline',
        description: 'Guaranteed that client-submitted totals cannot alter actual checkout amounts by recalculating every item against database prices server-side.'
      },
      {
        title: 'Sprint-Based Production Polish',
        description: 'Structured development across documented sprints focusing on security hardening, UI responsiveness, and code quality audits.'
      },
      {
        title: 'API Security & Rate Limiting',
        description: 'Protected authentication routes and API endpoints against brute-force abuse using express-rate-limit and Helmet security headers.'
      }
    ],
    securityHardening: [
      'HMAC-SHA256 Razorpay payment signature verification',
      'Stateless JWT session authorization with Bearer tokens',
      'bcrypt password hashing with salted rounds',
      'Email OTP verification with 10-minute expiration',
      'Helmet security headers and CORS origin allowlists',
      'Server-side field validation and request body capping'
    ],
    screenshots: [
      {
        url: '/projects/cartify/home.png',
        title: 'Cartify Storefront & Catalog',
        caption: 'Responsive product discovery catalog with category filters and instant cart interaction.'
      },
      {
        url: '/projects/cartify/products.png',
        title: 'Product Grid & Filtering',
        caption: 'Categorized catalog showcasing server-synced pricing, image previews, and stock status.'
      },
      {
        url: '/projects/cartify/mobile-view.jpeg',
        title: 'Mobile Checkout Experience',
        caption: 'Mobile-first navigation, responsive product drawers, and streamlined checkout.'
      }
    ]
  }
};
