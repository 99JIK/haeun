import React from 'react';
import styles from './GalleryView.module.css';

export interface GalleryItem {
  id: string;
  image?: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

interface GalleryViewProps {
  items: GalleryItem[];
}

export default function GalleryView({ items }: GalleryViewProps) {
  return (
    <div className={styles.gallery}>
      {items.map(item => (
        <div
          key={item.id}
          className={styles.card}
          onClick={item.onClick}
          tabIndex={0}
          role="button"
        >
          {item.image ? (
            <img src={item.image} alt={item.title} className={styles.image} />
          ) : (
            <div className={styles.image + ' ' + (styles.placeholder || '')}>🗂️</div>
          )}
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            {item.description && (
              <div className={styles.description}>{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 