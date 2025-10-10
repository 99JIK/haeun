import React from 'react';
import styles from './ListView.module.css';

interface ListMeeting {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  owner: string;
  pageUrl?: string;
}

interface ListViewProps {
  meetings: ListMeeting[];
}

export default function ListView({ meetings }: ListViewProps) {
  return (
    <div className={styles.list}>
      {meetings.map(m => (
        <div
          key={m.id}
          className={styles.item}
          onClick={() => m.pageUrl && (window.location.href = m.pageUrl)}
          tabIndex={0}
          role="button"
        >
          <div className={styles.title}>{m.title}</div>
          {m.description && <div className={styles.desc}>{m.description}</div>}
          <div className={styles.meta}>
            <span>{m.startDate === m.endDate ? m.startDate : `${m.startDate} ~ ${m.endDate}`}</span>
            <span>{m.owner}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 