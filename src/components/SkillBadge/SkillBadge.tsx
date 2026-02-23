import React from 'react';
import Link from '@docusaurus/Link';
import styles from './SkillBadge.module.css';

interface SkillBadgeProps {
  icon?: string;
  label: string;
  color?: string;
  href?: string;
}

export default function SkillBadge({ icon, label, color, href }: SkillBadgeProps) {
  const style = color ? { '--badge-color': color } as React.CSSProperties : undefined;
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={`${styles.badge} ${styles.linked}`} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <span className={styles.badge} style={style}>
      {content}
    </span>
  );
}
