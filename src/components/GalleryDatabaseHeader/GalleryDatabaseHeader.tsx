import React from 'react';
import styles from './GalleryDatabaseHeader.module.css';

interface GalleryDatabaseHeaderProps {
  icon: string;
  title: string;
  viewOptions: string[];
  selectedView: string;
  onViewChange: (view: string) => void;
}

export default function GalleryDatabaseHeader({
  icon,
  title,
  viewOptions,
  selectedView,
  onViewChange,
}: GalleryDatabaseHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.title}>{title}</span>
      <select
        className={styles.dropdown}
        value={selectedView}
        onChange={e => onViewChange(e.target.value)}
      >
        {viewOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
} 