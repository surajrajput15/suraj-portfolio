import React, { useState } from 'react';
import {
  Download,
  FileText,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  Sparkles,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  FEATURED_PROJECTS,
  RESUME_PITCH,
  RESUME_STATS,
  TOP_SKILLS,
  RESUME_LAST_UPDATED
} from '../../data/portfolioData';

type ResumeTab = 'quick' | 'full' | 'pdf';

const SKILL_LEVEL_LABEL: Record<string, string> = {
  production: 'Production',
  working: 'Working',
  familiar: 'Familiar',
};

const SKILL_LEVEL_COLOR: Record<string, string> = {
  production: 'bg-violet-500/15 text-violet-200 border-violet-400/30',
  working: 'bg-white/[0.05] text-zinc-200 border-white/[0.12]',
  familiar: 'bg-white/[0.03] text-zinc-400 border-white/[0.08]',
};

const PROJECT_IMPACT: Record<string, string[]> = {
  studysnap: [
    'Integrated 4 Groq LLaMA-3.1 AI workflows (tutoring, summarization, MCQ, translation)',
    'Shipped installable PWA with offline support + service worker caching',
    'Type-safe schema across 8+ tables on Neon Serverless PostgreSQL',
  ],
  cartify: [
    'Server-authoritative Razorpay checkout with HMAC-SHA256 signature verification',
    '3 auth flows (email/password, OTP, Google OAuth) + JWT + protected admin routes',
    'Hardened with Helmet, CORS allowlist, rate limiting, and input validation',
  ],
};

export const ResumeSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<ResumeTab>('quick');

  const quickStats = [
    { label: 'Projects', value: RESUME_STATS.projects, accent: 'text-violet-300' },
    { label: 'Internships', value: RESUME_STATS.internships, accent: 'text-emerald-300' },
    { label: 'Certifications', value: RESUME_STATS.certifications, accent: 'text-amber-300' },
    { label: 'CGPA', value: RESUME_STATS.cgpa, accent: 'text-fuchsia-300' },
  ];

  return (
    <section id="resume" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-violet-400" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Resume & Credentials
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-2">
              Last updated: {RESUME_LAST_UPDATED}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* 3-Tab Toggle */}
            <div className="p-1 rounded-xl bg-[#111115] border border-white/[0.1] flex items-center gap-1">
              {(
                [
                  { id: 'quick', label: 'Quick View' },
                  { id: 'full', label: 'Full Resume' },
                  { id: 'pdf', label: 'PDF' },
                ] as { id: ResumeTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewMode(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === tab.id
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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

        {/* TAB 1: QUICK VIEW (default) */}
        {viewMode === 'quick' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Card: Photo + Name + Contact */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#09090C] border border-white/[0.1] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-violet-600 shrink-0">
                <img
                  src="/profile.jpg"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="96"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-sm font-mono text-violet-300 font-semibold mt-1">
                  {PERSONAL_INFO.positioning}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-zinc-400 mt-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <span className="text-zinc-700">·</span>
                  <span>{PERSONAL_INFO.phone}</span>
                  <span className="text-zinc-700">·</span>
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    aria-label="Email"
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.16] transition-all"
                >
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <div className={`font-display text-2xl sm:text-3xl font-extrabold ${stat.accent}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 30-Second Pitch */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.04] to-transparent border border-violet-400/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center shrink-0">
                  <Quote className="w-5 h-5 text-violet-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-violet-300 font-bold mb-2">
                    30-Second Pitch
                  </div>
                  <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                    {RESUME_PITCH}
                  </p>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#09090C] border border-white/[0.1]">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Top Skills
                </h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {TOP_SKILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${SKILL_LEVEL_COLOR[skill.level]}`}
                  >
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-[10px] font-mono opacity-70">
                      {SKILL_LEVEL_LABEL[skill.level]}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects (Top 2) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-violet-400" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Featured Projects
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURED_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h5 className="font-display text-lg font-bold text-white tracking-tight">
                          {project.title}
                        </h5>
                        <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-violet-300 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 shrink-0">
                        {project.number}
                      </span>
                    </div>

                    <ul className="space-y-1.5 mb-4 flex-1">
                      {(PROJECT_IMPACT[project.id] ?? []).map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience + Education + Certs (compact 2-col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-violet-400" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                    Experience
                  </h4>
                </div>
                <div className="space-y-4">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="text-sm font-semibold text-white">{exp.role}</div>
                      <div className="text-xs text-zinc-400">
                        {exp.company} · {exp.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-violet-400" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                    Education
                  </h4>
                </div>
                <div className="space-y-3">
                  {EDUCATION.slice(0, 1).map((edu) => (
                    <div key={edu.degree} className="space-y-1">
                      <div className="text-sm font-semibold text-white">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {edu.institution} · {edu.period}
                      </div>
                      {edu.cgpa && (
                        <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-mono text-emerald-300">
                          <span>CGPA: {edu.cgpa}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications (compact) */}
            <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Certifications
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-start gap-2 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="font-medium text-zinc-200 line-clamp-1">
                        {cert.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {cert.issuer} · {cert.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL RESUME (ATS formatted view) */}
        {viewMode === 'full' && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#09090C] border border-white/[0.1] shadow-2xl space-y-10 text-left font-sans animate-fade-in">
            {/* Resume Header */}
            <div className="border-b border-white/[0.08] pb-8 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <span className="font-mono text-sm text-violet-400 font-semibold">
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
                {RESUME_PITCH}
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
                        <li
                          key={i}
                          className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed"
                        >
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
                {FEATURED_PROJECTS.map((project) => (
                  <div key={project.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <div className="text-sm font-bold text-white">
                        {project.title}{' '}
                        <span className="text-xs font-mono text-zinc-400 font-normal">
                          | {project.technologies.slice(0, 7).join(', ')}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-violet-400 flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            Live
                          </a>
                        )}
                        {project.liveUrl && <span>•</span>}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                <span>Education</span>
              </h4>
              {EDUCATION.map((edu, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1"
                >
                  <div className="font-bold text-white text-sm">
                    {edu.institution}{' '}
                    <span className="font-normal text-zinc-400">— {edu.degree}</span>
                    {edu.cgpa && (
                      <span className="font-mono text-emerald-300 ml-2">
                        · CGPA {edu.cgpa}
                      </span>
                    )}
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
                  <div>
                    <strong className="text-white">Languages:</strong> JavaScript,
                    TypeScript, Python, HTML, CSS, SQL
                  </div>
                  <div>
                    <strong className="text-white">Frameworks:</strong> React,
                    Next.js, Node.js, Express, Tailwind CSS
                  </div>
                  <div>
                    <strong className="text-white">AI & Cloud:</strong> Groq API,
                    Gemini API, IBM Cloud, Vercel, Render, Neon
                  </div>
                  <div>
                    <strong className="text-white">Databases:</strong> PostgreSQL,
                    MongoDB, Redis, Drizzle ORM, Mongoose
                  </div>
                  <div>
                    <strong className="text-white">Security:</strong> Clerk, JWT,
                    OAuth, Razorpay HMAC, Helmet, Rate Limiting
                  </div>
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
                      <span>
                        {c.title} ({c.issuer}, {c.year})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PDF (lazy-mounted) */}
        {viewMode === 'pdf' && (
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
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
