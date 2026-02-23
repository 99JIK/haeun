import React, { useState } from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './CalendarView.module.css';

interface CalendarMeeting {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  pageUrl?: string;
}

interface CalendarViewProps {
  meetings: CalendarMeeting[];
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (Date | null)[][] = [];
  let week: (Date | null)[] = [];
  const d = new Date(firstDay);
  d.setDate(1 - d.getDay());
  for (let i = 0; i < 6 * 7; i++) {
    week.push(d >= firstDay && d <= lastDay ? new Date(d) : null);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
    d.setDate(d.getDate() + 1);
  }
  if (matrix[matrix.length - 1].every(v => v === null)) {
    matrix.pop();
  }
  return matrix;
}

function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function buildMeetingMap(meetings: CalendarMeeting[], year: number, month: number) {
  const map: Record<string, CalendarMeeting[]> = {};
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  meetings.forEach(m => {
    const start = new Date(m.startDate);
    const end = new Date(m.endDate);
    const rangeStart = start < monthStart ? monthStart : start;
    const rangeEnd = end > monthEnd ? monthEnd : end;

    const d = new Date(rangeStart);
    while (d <= rangeEnd) {
      const key = toDateKey(d);
      if (!map[key]) map[key] = [];
      map[key].push(m);
      d.setDate(d.getDate() + 1);
    }
  });
  return map;
}

const BAR_COLORS = [
  'var(--ifm-color-primary)',
  '#27ae60',
  '#f2994a',
  '#eb5757',
  '#9b59b6',
  '#2d9cdb',
];

export default function CalendarView({ meetings }: CalendarViewProps) {
  const history = useHistory();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const matrix = getMonthMatrix(year, month);
  const meetingMap = buildMeetingMap(meetings, year, month);

  const colorMap: Record<string, string> = {};
  meetings.forEach((m, i) => {
    colorMap[m.id] = BAR_COLORS[i % BAR_COLORS.length];
  });

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else { setMonth(m => m - 1); }
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else { setMonth(m => m + 1); }
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.nav}>
        <button className={styles.navBtn} onClick={prevMonth}>←</button>
        <span className={styles.navTitle}>{year}년 {month + 1}월</span>
        <button className={styles.navBtn} onClick={nextMonth}>→</button>
      </div>
      <div className={styles.header}>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {matrix.map((week, wi) => (
        <div className={styles.grid} key={wi}>
          {week.map((date, j) => {
            const key = date ? toDateKey(date) : '';
            const activeMeetings = date ? (meetingMap[key] || []) : [];

            return (
              <div
                key={j}
                className={`${styles.cell} ${!date ? styles.empty : ''} ${date && isToday(date) ? styles.today : ''}`}
              >
                {date && (
                  <>
                    <span className={styles.dayNumber}>{date.getDate()}</span>
                    <div className={styles.bars}>
                      {activeMeetings.map(m => {
                        const mStart = new Date(m.startDate);
                        const mEnd = new Date(m.endDate);
                        const monthLastDay = new Date(year, month + 1, 0);
                        const isStart = toDateKey(date) === toDateKey(mStart) || j === 0 || date.getDate() === 1;
                        const isEnd = toDateKey(date) === toDateKey(mEnd) || j === 6 || toDateKey(date) === toDateKey(monthLastDay);
                        const showLabel = toDateKey(date) === toDateKey(mStart) || j === 0 || date.getDate() === 1;

                        return (
                          <div
                            key={m.id}
                            className={`${styles.bar} ${isStart ? styles.barStart : ''} ${isEnd ? styles.barEnd : ''}`}
                            style={{ background: colorMap[m.id] }}
                            title={m.title}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (m.pageUrl) history.push(m.pageUrl);
                            }}
                          >
                            {showLabel && (
                              <span className={styles.barLabel}>{m.title}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
