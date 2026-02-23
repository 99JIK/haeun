import React from 'react';
import styles from './ProfileHero.module.css';

interface ProfileHeroProps {
  emoji?: string;
  avatarUrl?: string;
  name: string;
  subtitle: string;
  tagline?: string;
}

export default function ProfileHero({
  emoji = '👩‍💻',
  avatarUrl,
  name,
  subtitle,
  tagline,
}: ProfileHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.cover} />
      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className={styles.avatarImage} />
          ) : (
            <span className={styles.emoji}>{emoji}</span>
          )}
        </div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
      </div>
    </div>
  );
}
