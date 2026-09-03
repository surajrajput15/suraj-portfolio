import React from 'react';
import { RESPONSIVE_IMAGES, type ResponsiveEntry } from '../../data/responsiveImages';

const MAP = RESPONSIVE_IMAGES;

function entryFor(src: string): ResponsiveEntry | undefined {
  return MAP[src];
}

function buildSrcSet(entries: string[], widths: number[]): string {
  return widths.map((w, i) => `${entries[i]} ${w}w`).join(', ');
}

const SIZES: Record<ImageLayout, string> = {
  'hero-profile': '(max-width: 640px) 176px, (max-width: 1024px) 224px, 256px',
  'about-card': '(max-width: 1024px) 56px, 56px',
  'resume-header': '(max-width: 640px) 80px, 96px',
  'project-hero': '(max-width: 1024px) 100vw, 60vw',
  'project-card': '(max-width: 1024px) 100vw, 50vw',
  'case-study-screenshot': '(max-width: 640px) 100vw, 50vw',
  'og': '100vw',
};

export type ImageLayout =
  | 'hero-profile'
  | 'about-card'
  | 'resume-header'
  | 'project-hero'
  | 'project-card'
  | 'case-study-screenshot'
  | 'og';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  layout?: ImageLayout;
  sizes?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  width,
  height,
  layout = 'project-card',
  sizes,
  objectFit = 'cover',
  objectPosition = 'top',
}) => {
  const e = entryFor(src);
  const sizesAttr = sizes ?? SIZES[layout];
  const imgStyle: React.CSSProperties = { objectFit, objectPosition };

  if (!e) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        style={imgStyle}
      />
    );
  }

  const avifSet = buildSrcSet(e.avif, e.widths);
  const webpSet = buildSrcSet(e.webp, e.widths);
  const fallbackSet = buildSrcSet(e.fallback, e.widths);
  const fallbackSrc = e.fallback[e.fallback.length - 1] ?? src;
  const fallbackW = e.widths[e.widths.length - 1] ?? e.originalWidth;

  return (
    <picture>
      <source type="image/avif" srcSet={avifSet} sizes={sizesAttr} />
      <source type="image/webp" srcSet={webpSet} sizes={sizesAttr} />
      <img
        src={fallbackSrc}
        srcSet={fallbackSet}
        sizes={sizesAttr}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width ?? fallbackW}
        height={height}
        style={imgStyle}
      />
    </picture>
  );
};
