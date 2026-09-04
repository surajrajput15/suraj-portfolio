import React from 'react';
import { useReveal } from '../../hooks/useReveal';

type DivProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  children: React.ReactNode;
  className?: string;
};

export const Reveal: React.FC<DivProps> = ({
  as = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) => {
  const [ref, visible] = useReveal<HTMLElement>();
  const Component = as as React.ElementType;
  const transitionStyle = { transitionDelay: `${delay}ms` } as React.CSSProperties;

  const mergedStyle: React.CSSProperties = {
    ...(rest.style as React.CSSProperties | undefined),
    ...transitionStyle,
  };

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};
