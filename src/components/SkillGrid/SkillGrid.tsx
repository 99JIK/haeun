import React, {ReactNode} from 'react';
import styles from './SkillGrid.module.css';

interface SkillGridProps {
  title?: string;
  children: ReactNode;
}

export default function SkillGrid({ title, children }: SkillGridProps) {
  return (
    <div className={styles.section}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.grid}>{children}</div>
    </div>
  );
}
