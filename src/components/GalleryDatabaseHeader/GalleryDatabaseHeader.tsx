import React, { useState, useRef, useEffect } from 'react';
import styles from './GalleryDatabaseHeader.module.css';

const VIEW_ICONS: Record<string, string> = {
  '갤러리': '🖼️',
  '테이블': '📊',
  '보드': '📋',
  '타임라인': '📅',
  '리스트': '📝',
  '캘린더': '🗓️',
};

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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.title}>{title}</span>
        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            className={styles.dropdownBtn}
            onClick={() => setOpen(o => !o)}
          >
            <span className={styles.dropdownIcon}>{VIEW_ICONS[selectedView] || '📄'}</span>
            {selectedView}
            <span className={styles.chevron}>{open ? '▴' : '▾'}</span>
          </button>
          {open && (
            <div className={styles.dropdownMenu}>
              {viewOptions.map(opt => (
                <button
                  key={opt}
                  className={`${styles.dropdownItem} ${opt === selectedView ? styles.dropdownItemActive : ''}`}
                  onClick={() => { onViewChange(opt); setOpen(false); }}
                >
                  <span className={styles.dropdownItemIcon}>{VIEW_ICONS[opt] || '📄'}</span>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
