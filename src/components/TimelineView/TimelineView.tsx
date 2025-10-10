import React, { useRef, useState, useEffect } from 'react';
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

function getDateRange(meetings: TimelineMeeting[]) {
  const allDates = meetings.flatMap(m => [m.startDate, m.endDate]);
  const min = allDates.reduce((a, b) => (a < b ? a : b));
  const max = allDates.reduce((a, b) => (a > b ? a : b));
  return { min, max };
}

function getDatesArray(start: string, end: string) {
  const arr = [];
  let d = new Date(start);
  const endD = new Date(end);
  while (d <= endD) {
    arr.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return arr;
}

export default function TimelineView({ meetings }: TimelineViewProps) {
  // 날짜 범위 계산
  const { min, max } = getDateRange(meetings);
  const dates = getDatesArray(min, max);
  const dateCount = dates.length;

  // 각 미팅의 바 위치/길이 계산 (grid 기반)
  function getBarGrid(start: string, end: string) {
    const startIdx = dates.indexOf(start) + 2; // grid-column 1: title, 2~: 날짜
    const endIdx = dates.indexOf(end) + 2;
    return {
      gridColumnStart: startIdx,
      gridColumnEnd: endIdx + 1,
    };
  }

  // meetings을 startDate 기준으로 정렬
  const sortedMeetings = [...meetings].sort((a, b) => a.startDate.localeCompare(b.startDate));

  // 연도 라벨용 데이터 생성
  const yearLabels: { year: string; startIdx: number }[] = [];
  let prevYear = '';
  dates.forEach((date, i) => {
    const year = date.slice(0, 4);
    if (year !== prevYear) {
      yearLabels.push({ year, startIdx: i });
      prevYear = year;
    }
  });

  // 각 bar에 ref를 부여
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const expandTimeout = useRef<NodeJS.Timeout | null>(null);

  // 마퀴(좌우 순환) 효과를 위한 상태
  const [marqueeIdx, setMarqueeIdx] = useState<number | null>(null);
  const [marqueeKey, setMarqueeKey] = useState(0);

  useEffect(() => {
    if (marqueeIdx !== null) {
      const timer = setTimeout(() => {
        setMarqueeKey(k => k + 1); // 강제 리렌더로 애니메이션 반복
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [marqueeIdx, marqueeKey]);

  function handleTitleClick(rowIdx: number) {
    // 스크롤 이동
    const ref = barRefs.current[rowIdx];
    if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    // 텍스트 확장
    setExpandedIdx(rowIdx);
    if (expandTimeout.current) clearTimeout(expandTimeout.current);
    expandTimeout.current = setTimeout(() => setExpandedIdx(null), 2000);
  }

  return (
    <div
      className={styles.timeline}
      style={{ ['--timeline-date-count' as any]: dateCount }}
    >
      {/* 연도 라벨 행 */}
      <div className={styles.titleCell} style={{ gridRow: 1, gridColumn: 1 }} />
      {yearLabels.map((y, idx) => (
        <div
          key={y.year}
          className={styles.dateLabel + ' ' + styles.stickyYear}
          style={{ gridColumn: y.startIdx + 2, gridRow: 1, fontWeight: 700, fontSize: '1.08rem' }}
        >
          {y.year}
        </div>
      ))}
      {/* 날짜 라벨 행 */}
      <div className={styles.titleCell} style={{ gridRow: 2, gridColumn: 1 }} />
      {dates.map((date, i) => (
        <div
          key={date}
          className={styles.dateLabel}
          style={{ gridColumn: i + 2, gridRow: 2 }}
        >
          {date.slice(5)}
        </div>
      ))}
      {/* 각 row: titleCell, bar를 같은 grid에 맞춰 렌더링 */}
      {sortedMeetings.map((m, rowIdx) => {
        const barText = m.startDate === m.endDate
          ? m.startDate.slice(5)
          : `${m.startDate.slice(5)}~${m.endDate.slice(5)}`;
        const barGrid = getBarGrid(m.startDate, m.endDate);
        return [
          <div
            key={m.id + '-title'}
            className={styles.titleCell}
            style={{ gridRow: rowIdx + 3, gridColumn: 1 }}
            title={m.title}
            onClick={() => {
              const ref = barRefs.current[rowIdx];
              if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
            tabIndex={0}
            role="button"
          >
            {m.title}
          </div>,
          <div
            key={m.id + '-bar'}
            className={styles.bar}
            style={{ ...barGrid, gridRow: rowIdx + 3 }}
            onClick={() => m.pageUrl && (window.location.href = m.pageUrl)}
            tabIndex={0}
            role="button"
            ref={el => { barRefs.current[rowIdx] = el; }}
          >
            {barText}
          </div>,
        ];
      })}
    </div>
  );
} 