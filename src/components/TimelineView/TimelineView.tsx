import React, { useRef } from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './TimelineView.module.css';

interface TimelineMeeting {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  pageUrl?: string;
}

interface TimelineViewProps {
  meetings: TimelineMeeting[];
}

function getMonthsArray(meetings: TimelineMeeting[]) {
  const allDates = meetings.flatMap(m => [m.startDate, m.endDate]);
  const minDate = allDates.reduce((a, b) => (a < b ? a : b));
  const maxDate = allDates.reduce((a, b) => (a > b ? a : b));

  const start = new Date(minDate);
  const end = new Date(maxDate);
  start.setDate(1);
  end.setDate(1);

  const months: { key: string; year: number; month: number; label: string }[] = [];
  const d = new Date(start);
  while (d <= end) {
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${d.getMonth() + 1}월`,
    });
    d.setMonth(d.getMonth() + 1);
  }
  return months;
}

function getMonthIndex(dateStr: string, months: { key: string }[]) {
  const d = new Date(dateStr);
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return months.findIndex(m => m.key === key);
}

export default function TimelineView({ meetings }: TimelineViewProps) {
  const history = useHistory();
  const months = getMonthsArray(meetings);
  const sortedMeetings = [...meetings].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const scrollRef = useRef<HTMLDivElement>(null);

  const yearGroups: { year: number; startIdx: number; count: number }[] = [];
  let prevYear = -1;
  months.forEach((m, i) => {
    if (m.year !== prevYear) {
      yearGroups.push({ year: m.year, startIdx: i, count: 1 });
      prevYear = m.year;
    } else {
      yearGroups[yearGroups.length - 1].count++;
    }
  });

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <div
        className={styles.timeline}
        style={{ gridTemplateColumns: `140px repeat(${months.length}, 80px)` }}
      >
        {/* Header: Years */}
        <div className={styles.nameCol} />
        {yearGroups.map(yg => (
          <div
            key={yg.year}
            className={styles.yearLabel}
            style={{ gridColumn: `${yg.startIdx + 2} / span ${yg.count}` }}
          >
            {yg.year}
          </div>
        ))}
        {/* Header: Months */}
        <div className={styles.nameCol} />
        {months.map((m) => (
          <div key={m.key} className={styles.monthLabel}>
            {m.label}
          </div>
        ))}
        {/* Meeting rows */}
        {sortedMeetings.map((m) => {
          const startIdx = getMonthIndex(m.startDate, months);
          const endIdx = getMonthIndex(m.endDate, months);
          return (
            <React.Fragment key={m.id}>
              <div className={styles.nameCol} title={m.title}>
                {m.title}
              </div>
              {months.map((_, i) => (
                <div key={i} className={styles.cellBg}>
                  {i >= startIdx && i <= endIdx && (
                    <div
                      className={`${styles.bar} ${i === startIdx ? styles.barStart : ''} ${i === endIdx ? styles.barEnd : ''}`}
                      onClick={() => m.pageUrl && history.push(m.pageUrl)}
                      title={`${m.title} (${m.startDate} ~ ${m.endDate})`}
                    >
                      {i === startIdx && (
                        <span className={styles.barLabel}>{m.title}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
