import React from 'react';
import {useHistory} from '@docusaurus/router';
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
  const history = useHistory();
  return (
    <div className={styles.list}>
      {meetings.map(m => (
        <div
          key={m.id}
          className={styles.item}
          onClick={() => m.pageUrl && history.push(m.pageUrl)}
          tabIndex={0}
          role="button"
        >
          <span className={styles.icon}>📄</span>
          <div className={styles.titleArea}>
            <div className={styles.title}>{m.title}</div>
            {m.description && <div className={styles.desc}>{m.description}</div>}
          </div>
          <div className={styles.meta}>
            <span>{m.startDate === m.endDate ? m.startDate : `${m.startDate} ~ ${m.endDate}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
