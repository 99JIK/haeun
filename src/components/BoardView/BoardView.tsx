import React from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './BoardView.module.css';

interface BoardMeeting {
  id: string;
  title: string;
  description?: string;
  status?: string;
  pageUrl?: string;
}

interface BoardViewProps {
  meetings: BoardMeeting[];
}

const STATUS_ORDER = ['To Do', 'In Progress', 'Done'];
const STATUS_LABELS: Record<string, string> = {
  'To Do': '할 일',
  'In Progress': '진행 중',
  'Done': '완료',
};
const STATUS_COLORS: Record<string, string> = {
  'To Do': '#eb5757',
  'In Progress': '#f2994a',
  'Done': '#27ae60',
};

export default function BoardView({ meetings }: BoardViewProps) {
  const history = useHistory();
  const columns = STATUS_ORDER.map(status => ({
    status,
    label: STATUS_LABELS[status] || status,
    color: STATUS_COLORS[status] || '#999',
    cards: meetings.filter(m => m.status === status),
  }));

  return (
    <div className={styles.board}>
      {columns.map(col => (
        <div key={col.status} className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.statusDot} style={{ background: col.color }} />
            {col.label}
            <span className={styles.statusCount}>{col.cards.length}</span>
          </div>
          {col.cards.map(card => (
            <div
              key={card.id}
              className={styles.card}
              onClick={() => card.pageUrl && history.push(card.pageUrl)}
              tabIndex={0}
              role="button"
            >
              <div className={styles.cardTitle}>{card.title}</div>
              {card.description && <div className={styles.cardDesc}>{card.description}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
