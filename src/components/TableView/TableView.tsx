import React from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './TableView.module.css';

interface TableMeeting {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  owner: string;
  description?: string;
  status?: string;
  pageUrl?: string;
}

interface TableViewProps {
  meetings: TableMeeting[];
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  'In Progress': { bg: 'rgba(242, 153, 74, 0.15)', color: '#f2994a' },
  'Done': { bg: 'rgba(39, 174, 96, 0.15)', color: '#27ae60' },
  'To Do': { bg: 'rgba(235, 87, 87, 0.15)', color: '#eb5757' },
};

export default function TableView({ meetings }: TableViewProps) {
  const history = useHistory();
  return (
    <div className={styles.table}>
      <div className={styles.headerRow}>
        <div className={`${styles.cell} ${styles.headerCell} ${styles.nameCell}`}>프로젝트</div>
        <div className={`${styles.cell} ${styles.headerCell} ${styles.statusCell}`}>상태</div>
        <div className={`${styles.cell} ${styles.headerCell} ${styles.dateCell}`}>기간</div>
        <div className={`${styles.cell} ${styles.headerCell} ${styles.descCell}`}>설명</div>
      </div>
      {meetings.map(m => {
        const statusStyle = STATUS_STYLES[m.status || ''] || { bg: 'var(--notion-bg-tertiary)', color: 'var(--notion-text-secondary)' };
        return (
          <div
            key={m.id}
            className={styles.row}
            onClick={() => m.pageUrl && history.push(m.pageUrl)}
            tabIndex={0}
            role="button"
          >
            <div className={`${styles.cell} ${styles.nameCell}`}>
              <span className={styles.pageIcon}>📄</span>
              <span className={styles.titleText}>{m.title}</span>
            </div>
            <div className={`${styles.cell} ${styles.statusCell}`}>
              {m.status && (
                <span
                  className={styles.statusBadge}
                  style={{ background: statusStyle.bg, color: statusStyle.color }}
                >
                  {m.status === 'In Progress' ? '진행 중' : m.status === 'Done' ? '완료' : '할 일'}
                </span>
              )}
            </div>
            <div className={`${styles.cell} ${styles.dateCell}`}>
              <span className={styles.dateText}>
                {m.startDate} → {m.endDate}
              </span>
            </div>
            <div className={`${styles.cell} ${styles.descCell}`}>
              <span className={styles.descText}>{m.description || ''}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
