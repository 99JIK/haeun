import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useState } from 'react';
import styles from './index.module.css';
import Callout from '../components/Callout/Callout';
import Toggle from '../components/Toggle/Toggle';
import Quote from '../components/Quote/Quote';
import GalleryView, { GalleryItem } from '../components/GalleryView/GalleryView';
import GalleryDatabaseHeader from '../components/GalleryDatabaseHeader/GalleryDatabaseHeader';
import Database from '../components/Database/Database';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      title: '멋진 풍경',
      description: '자연이 주는 평온함을 느껴보세요.',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      title: '코딩하는 시간',
      description: '생산적인 하루의 시작!',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      title: '책과 커피',
      description: '여유로운 오후를 위한 최고의 조합.',
    },
  ];
  const [selectedView, setSelectedView] = useState('모든 회의');
  const tableColumns = [
    { key: 'title', label: '제목' },
    { key: 'date', label: '날짜' },
    { key: 'owner', label: '담당자' },
  ];
  const tableRows = [
    { title: '제품 출시 사후 검토', date: '2024-05-01', owner: '홍길동' },
    { title: '주간 팀 미팅', date: '2024-05-03', owner: '김철수' },
    { title: 'GTM 전략 발표', date: '2024-05-05', owner: '이영희' },
  ];
  const meetings = [
    {
      id: '1',
      title: '제품 출시 사후 검토',
      startDate: '2024-01-10',
      endDate: '2024-01-15',
      owner: '홍길동',
      description: '연초 제품 출시 후 검토 회의',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      status: 'To Do',
      pageUrl: '/meeting/1',
    },
    {
      id: '2',
      title: '주간 팀 미팅',
      startDate: '2024-03-05',
      endDate: '2024-03-05',
      owner: '김철수',
      description: '3월 첫 주 팀 미팅',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      status: 'In Progress',
      pageUrl: '/meeting/2',
    },
    {
      id: '3',
      title: 'GTM 전략 발표',
      startDate: '2024-06-20',
      endDate: '2024-06-25',
      owner: '이영희',
      description: '상반기 GTM 전략 발표',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      status: 'Done',
      pageUrl: '/meeting/3',
    },
    {
      id: '4',
      title: '하반기 프로젝트 킥오프',
      startDate: '2024-09-01',
      endDate: '2024-09-10',
      owner: '박민수',
      description: '하반기 주요 프로젝트 시작',
      image: '',
      status: 'To Do',
      pageUrl: '/meeting/4',
    },
    {
      id: '5',
      title: '연말 결산 회의',
      startDate: '2024-12-15',
      endDate: '2024-12-20',
      owner: '최지은',
      description: '2024년 결산 및 내년 계획',
      image: '',
      status: 'Done',
      pageUrl: '/meeting/5',
    },
  ];
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles.notionContainer}>
        <Database
          icon="🗂️"
          title="회의록"
          viewOptions={['갤러리', '테이블', '보드', '타임라인', '리스트', '캘린더']}
          initialView="갤러리"
          meetings={meetings}
          tableColumns={tableColumns}
        />
      </div>
    </Layout>
  );
}

function NotionToggle({ title, children, notionClass }: { title: string; children: ReactNode; notionClass?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={notionClass} onClick={() => setOpen(o => !o)}>
      <span style={{ fontWeight: 600, fontSize: '1.05rem', userSelect: 'none' }}>
        {open ? '▼' : '▶'} {title}
      </span>
      {open && <div style={{ marginTop: 12 }}>{children}</div>}
    </div>
  );
}
