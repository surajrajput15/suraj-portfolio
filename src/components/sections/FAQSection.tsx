import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: 'Who is Suraj Bhan Pratap Singh?',
    answer: (
      <>
        I'm a <strong className="text-white">full-stack developer</strong> based in Jaipur,
        Rajasthan, currently pursuing B.Tech in Computer Science & Engineering at Jagannath
        University (CGPA 8.4/10). I build production-oriented web applications and AI-powered
        products, with internships at Edunet Foundation (AICTE / IBM SkillsBuild) and ApexPlanet
        Software.
      </>
    ),
  },
  {
    question: 'What projects have you built?',
    answer: (
      <>
        Two production-deployed case-study projects:{' '}
        <strong className="text-white">StudySnap</strong> — an AI-powered study platform with
        Clerk auth, Drizzle ORM, Upstash Redis, and PWA support (live at{' '}
        <a
          href="https://studysnap-sigma.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          studysnap-sigma.vercel.app
        </a>
        ) — and <strong className="text-white">Cartify</strong>, a hardened e-commerce platform
        with Razorpay checkout, JWT auth, and admin workflows (live at{' '}
        <a
          href="https://cartify-hub.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          cartify-hub.vercel.app
        </a>
        ). Plus three curated Tier-B projects spanning AI tutoring, agentic RAG, and ML.
      </>
    ),
  },
  {
    question: 'What is your tech stack?',
    answer: (
      <>
        <strong className="text-white">Frontend:</strong> React 19, Next.js 16, Vite 8, Tailwind
        CSS 4, Zustand, PWA. <strong className="text-white">Backend:</strong> Node.js, Express.js,
        REST APIs, JWT auth, MVC. <strong className="text-white">Databases:</strong> MongoDB Atlas,
        PostgreSQL (Neon) with Drizzle ORM, Upstash Redis. <strong className="text-white">AI:</strong>{' '}
        Groq (LLaMA-3.1), Google Gemini, IBM Granite / watsonx.ai via Langflow, RAG, Agentic AI,
        Scikit-Learn.
      </>
    ),
  },
  {
    question: 'Where do you study?',
    answer: (
      <>
        I'm pursuing B.Tech in Computer Science & Engineering at{' '}
        <a
          href="https://www.jagannathuniversity.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Jagannath University
        </a>{' '}
        in Jaipur, Rajasthan (2023–2027, CGPA 8.4/10). Coursework spans Data Structures &amp;
        Algorithms, DBMS, Operating Systems, Web Technologies, and Software Engineering.
      </>
    ),
  },
  {
    question: 'How can I contact you?',
    answer: (
      <>
        Email is the fastest channel:{' '}
        <a href="mailto:surajdona2005@gmail.com" className="text-primary hover:underline">
          surajdona2005@gmail.com
        </a>
        . You can also reach me on{' '}
        <a
          href="https://www.linkedin.com/in/suraj-bhan-pratap-singh-891727293"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          LinkedIn
        </a>{' '}
        or check out my code on{' '}
        <a
          href="https://github.com/surajrajput15"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          GitHub
        </a>
        . My portfolio lives at{' '}
        <a
          href="https://surajrajput15.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          surajrajput15.vercel.app
        </a>
        .
      </>
    ),
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          eyebrowIcon={<HelpCircle className="h-3.5 w-3.5" />}
          title="Frequently Asked"
          accent="Questions"
          subtitle="Answers to common questions about availability, stack, internships, and how I work."
          align="center"
        />

        {/* Accordion (native <details>) */}
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.map((item, idx) => (
            <Reveal key={item.question} delay={idx * 80}>
              <details className="group glass rounded-xl overflow-hidden hover:border-white/[0.18] transition-all">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-white hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-zinc-300 border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
