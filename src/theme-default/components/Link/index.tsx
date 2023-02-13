import React from 'react';
import styles from './index.module.scss';

const EXTERNAL_URL_PRE = /^https?/;

export interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Link(props: LinkProps) {
  const { href = '/', children, className = '' } = props;
  const isExternal = EXTERNAL_URL_PRE.test(href);
  const target = isExternal ? '_blank' : '';
  const rel = isExternal ? 'noopen noreferer' : undefined;
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${styles.link} ${className}`}
    >
      {children}
    </a>
  );
}
