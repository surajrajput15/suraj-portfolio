import React, { useState } from 'react';
import { Download, FileText, ExternalLink, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'ats' | 'pdf'>('ats');

  return (
    <section id="resume" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Resume & Credentials
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl bg-[#111115] border border-white/[0.1] flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('ats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'ats'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Clean Formatted View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'pdf'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                PDF Document
              </button>
            </div>

            {/* Direct Download Button */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Suraj_Bhan_Pratap_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* ATS Clean Formatted View */}
        {viewMode === 'ats' ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#09090C] border border-white/[0.1] shadow-2xl space-y-10 text-left font-sans animate-fade-in">
            {/* Resume Header */}
            <div className="border-b border-white/[0.08] pb-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <span className="font-mono text-sm text-blue-400 font-semibold">
                  {PERSONAL_INFO.positioning}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span>{PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>•</span>
                <span>{PERSONAL_INFO.location}</span>
                <span>•</span>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white underline underline-offset-4"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <span>Professional Summary</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Full Stack Developer and Computer Science undergraduate building production-oriented web applications and AI-powered products. Experienced in full-stack architecture, authentication, REST APIs, cloud deployment, application security, and performance optimization.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                <span>Experience</span>
              </h4>
              <div className="space-y-6">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <div className="text-sm font-bold text-white">
                        {exp.company}{' '}
                        <span className="text-zinc-400 font-normal">
                          · {exp.role}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-400">
                        {exp.period} | {exp.location}
                      </div>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                          <span className="text-zinc-400 mt-1">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Projects Summary */}
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-zinc-400" />
                <span>Featured Technical Projects</span>
              </h4>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="text-sm font-bold text-white">
                      StudySnap{' '}
                      <span className="text-xs font-mono text-zinc-400 font-normal">
                        | Next.js, React, TypeScript, Node.js, PostgreSQL, Clerk, Groq
                      </span>
                    </div>
                    <div className="text-xs font-mono text-blue-400 flex items-center gap-2">
                      <a href="https://studysnap-sigma.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline">Live Demo</a>
                      <span>•</span>
                      <a href="https://github.com/surajrajput999/StudySnap" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Built a full-stack study platform with rich-text notes, revision scheduling, voice notes, PDF export and PWA support. Integrated Groq-powered AI workflows for AI tutoring, summarization, MCQ generation, flashcards and translation through authenticated APIs. Implemented Clerk authentication, Express APIs, Drizzle ORM with Neon PostgreSQL, Zustand persistence, Upstash Redis caching and application security controls.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="text-sm font-bold text-white">
                      Cartify{' '}
                      <span className="text-xs font-mono text-zinc-400 font-normal">
                        | React, Vite, Node.js, Express, MongoDB, Razorpay
                      </span>
                    </div>
                    <div className="text-xs font-mono text-blue-400 flex items-center gap-2">
                      <a href="https://cartify-hub.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline">Live Demo</a>
                      <span>•</span>
                      <a href="https://github.com/surajrajput999/CARTIFY-APP" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Developed a full-stack e-commerce platform with product management, cart, checkout, orders, addresses and admin workflows. Implemented JWT, OTP/password authentication, Google OAuth, protected admin routes and Razorpay payment integration. Secured checkout with server-authoritative pricing, payment verification, rate limiting, Helmet, CORS and input validation; improved performance and accessibility with lazy loading, memoization and reusable components.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                <span>Education</span>
              </h4>
              {EDUCATION.map((edu, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div className="font-bold text-white text-sm">
                    {edu.institution} <span className="font-normal text-zinc-400">— {edu.degree}</span>
                  </div>
                  <div className="font-mono text-zinc-400">
                    {edu.period} | {edu.location}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills & Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/[0.08]">
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Technical Skills Summary
                </h4>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div><strong className="text-white">Languages:</strong> JavaScript, TypeScript, Python, HTML, CSS, SQL</div>
                  <div><strong className="text-white">Frameworks:</strong> React, Next.js, Node.js, Express, Tailwind CSS</div>
                  <div><strong className="text-white">AI & Cloud:</strong> Groq API, Gemini API, IBM Cloud, Vercel, Render, Neon</div>
                  <div><strong className="text-white">Databases:</strong> PostgreSQL, MongoDB, Redis, Drizzle ORM, Mongoose</div>
                  <div><strong className="text-white">Security:</strong> Clerk, JWT, OAuth, Razorpay HMAC, Helmet, Rate Limiting</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Certifications</span>
                </h4>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.id} className="flex items-center gap-1.5">
                      <span className="text-zinc-400">•</span>
                      <span>{c.title} ({c.issuer}, {c.year})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* PDF Viewer Tab */
          <div className="p-4 sm:p-6 rounded-3xl bg-[#09090C] border border-white/[0.1] space-y-4 text-center animate-fade-in">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
              <span>Official Document: Suraj_Bhan_Pratap_Singh_Resume.pdf</span>
              <a
                href={PERSONAL_INFO.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:underline"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full h-[750px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0E12]">
              <iframe
                src={`${PERSONAL_INFO.resumePdfUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full border-0"
                title="Suraj Bhan Pratap Singh Resume"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
