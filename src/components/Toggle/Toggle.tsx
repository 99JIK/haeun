import React, { useState, ReactNode } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Toggle({ title, children, className }: ToggleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className ? className + ' ' + styles.toggle : styles.toggle} onClick={() => setOpen(o => !o)}>
      <span className={styles.title}>
        {open ? '▼' : '▶'} {title}
      </span>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
} 