import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  id?: string;
  className?: string;
  delay?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowIcon,
  title,
  accent,
  subtitle,
  align = 'center',
  id,
  className = '',
  delay = 0,
}) => {
  const isCenter = align === 'center';
  return (
    <div
      id={id}
      className={`mb-12 sm:mb-16 ${isCenter ? 'text-center' : 'text-left'} ${className}`}
    >
      <Reveal as="div" delay={delay} className={isCenter ? 'inline-block' : ''}>
        <span className="eyebrow-chip">
          {eyebrowIcon}
          <span>{eyebrow}</span>
        </span>
      </Reveal>
      <Reveal as="h2" delay={delay + 80} className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
        {accent && (
          <>
            {' '}
            <span className="gradient-text">{accent}</span>
          </>
        )}
      </Reveal>
      {subtitle && (
        <Reveal
          as="p"
          delay={delay + 160}
          className={`mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed ${
            isCenter ? 'mx-auto max-w-xl' : 'max-w-2xl'
          }`}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
};
