import React, { useRef, useEffect, useState } from 'react';
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

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (Date | null)[][] = [];
  let week: (Date | null)[] = [];
  let d = new Date(firstDay);
  d.setDate(1 - d.getDay()); // 일요일부터 시작
  for (let i = 0; i < 6 * 7; i++) {
    week.push(d >= firstDay && d <= lastDay ? new Date(d) : null);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
    d.setDate(d.getDate() + 1);
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

export default function CalendarView({ meetings }: CalendarViewProps) {
  const [year, setYear] = React.useState(() => new Date().getFullYear());
  const [month, setMonth] = React.useState(() => new Date().getMonth());
  const matrix = getMonthMatrix(year, month);

  // 날짜별 회의 매핑
  const meetingMap: Record<string, CalendarMeeting[]> = {};
  meetings.forEach(m => {
    const d = new Date(m.startDate);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const key = d.toISOString().slice(0, 10);
      if (!meetingMap[key]) meetingMap[key] = [];
      meetingMap[key].push(m);
    }
  });

  // 셀 height를 calendar width/7로 맞추기 위한 로직
  const calendarRef = useRef<HTMLDivElement>(null);
  const [cellHeight, setCellHeight] = useState<number>(0);
  const [cellWidth, setCellWidth] = useState<number>(0);
  useEffect(() => {
    function updateCellSize() {
      if (calendarRef.current) {
        const calendarWidth = calendarRef.current.offsetWidth;
        // gap 2px * 6개 = 12px, padding 양쪽 0.5vw씩 제외 (더 작게)
        const availableWidth = calendarWidth - 12 - (calendarWidth * 0.01); // 0.5vw = 0.5% of width
        const cellSize = availableWidth / 7;
        setCellWidth(cellSize);
        setCellHeight(cellSize);
      }
    }
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  return (
    <div className={styles.calendar} ref={calendarRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button onClick={() => {
          if (month === 0) {
            setYear(y => y - 1);
            setMonth(11);
          } else {
            setMonth(m => m - 1);
          }
        }}>&lt;</button>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{year}년 {month + 1}월</span>
        <button onClick={() => {
          if (month === 11) {
            setYear(y => y + 1);
            setMonth(0);
          } else {
            setMonth(m => m + 1);
          }
        }}>&gt;</button>
      </div>
      <div className={styles.header}>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {matrix.map((week, i) => (
        <div className={styles.row} key={i}>
          {week.map((date, j) => (
            <div
              key={j}
              className={
                styles.cell +
                (date && isToday(date) ? ' ' + styles.today : '')
              }
              style={{ 
                width: cellWidth ? cellWidth + 'px' : undefined,
                height: cellHeight ? cellHeight + 'px' : undefined 
              }}
            >
              {date && (
                <>
                  <div>{date.getDate()}</div>
                  {meetingMap[date.toISOString().slice(0, 10)]?.map(m => (
                    <span
                      key={m.id}
                      className={styles.meeting}
                      title={m.title}
                      onClick={() => m.pageUrl && (window.location.href = m.pageUrl)}
                    >
                      {m.title}
                    </span>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 