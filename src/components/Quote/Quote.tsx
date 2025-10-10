import React from 'react';
import styles from './Quote.module.css';

interface QuoteProps {
  text: string;
  author?: string;
}

export default function Quote({ text, author }: QuoteProps) {
  return (
    <blockquote className={styles.quote}>
      {text}
      {author && (
        <div className={styles.author}>— {author}</div>
      )}
    </blockquote>
  );
} 