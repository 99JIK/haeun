import React from 'react';
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

export default function BoardView({ meetings }: BoardViewProps) {
  // status별로 그룹핑
  const columns = STATUS_ORDER.map(status => ({
    status,
    label: STATUS_LABELS[status] || status,
    cards: meetings.filter(m => m.status === status),
  }));

  return (
    <div className={styles.board}>
      {columns.map(col => (
        <div key={col.status} className={styles.column}>
          <div className={styles.columnHeader}>{col.label}</div>
          {col.cards.map(card => (
            <div
              key={card.id}
              className={styles.card}
              onClick={() => card.pageUrl && (window.location.href = card.pageUrl)}
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