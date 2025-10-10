import React from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  icon?: string;
  title?: string;
  description?: string;
  color?: string;
}

export default function Callout({ icon = '💡', title, description, color }: CalloutProps) {
  return (
    <div
      className={styles.callout}
      style={color ? { background: color } : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      <div>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );
} 