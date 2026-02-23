import React, {ReactNode} from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  icon?: string;
  title?: string;
  description?: string;
  color?: string;
  children?: ReactNode;
}

export default function Callout({ icon = '💡', title, description, color, children }: CalloutProps) {
  return (
    <div
      className={styles.callout}
      style={color ? { background: color } : undefined}
    >
      <span className={styles.icon}>{icon}</span>
      <div>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        {children && <div className={styles.description}>{children}</div>}
      </div>
    </div>
  );
}
