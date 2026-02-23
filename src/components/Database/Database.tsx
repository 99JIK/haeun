import React, { useState } from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './Database.module.css';
import GalleryDatabaseHeader from '../GalleryDatabaseHeader/GalleryDatabaseHeader';
import GalleryView, { GalleryItem } from '../GalleryView/GalleryView';
import TableView from '../TableView/TableView';
import BoardView from '../BoardView/BoardView';
import TimelineView from '../TimelineView/TimelineView';
import ListView from '../ListView/ListView';
import CalendarView from '../CalendarView/CalendarView';

interface Meeting {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  owner: string;
  description?: string;
  image?: string;
  status?: string;
  pageUrl?: string; // Added pageUrl to the interface
}

interface DatabaseProps {
  icon: string;
  title: string;
  viewOptions: string[];
  initialView: string;
  meetings: Meeting[];
}

export default function Database({ icon, title, viewOptions, initialView, meetings }: DatabaseProps) {
  const [viewType, setViewType] = useState(initialView);
  const history = useHistory();

  const galleryItems = meetings.map(m => ({
    id: m.id,
    image: m.image,
    title: m.title,
    description: m.description,
    onClick: m.pageUrl ? () => { history.push(m.pageUrl!); } : undefined,
  }));

  return (
    <div className={styles.database}>
      <GalleryDatabaseHeader
        icon={icon}
        title={title}
        viewOptions={viewOptions}
        selectedView={viewType}
        onViewChange={setViewType}
      />
      <div className={styles.viewArea}>
        {viewType === '갤러리' && <GalleryView items={galleryItems} />}
        {viewType === '테이블' && <TableView meetings={meetings} />}
        {viewType === '보드' && <BoardView meetings={meetings} />}
        {viewType === '타임라인' && <TimelineView meetings={meetings} />}
        {viewType === '리스트' && <ListView meetings={meetings} />}
        {viewType === '캘린더' && <CalendarView meetings={meetings} />}
        {/* 추후: BoardView, TimelineView 등 추가 */}
      </div>
    </div>
  );
} 