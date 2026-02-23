---
sidebar_position: 1
title: Portfolio Website
---

# Portfolio Website

Docusaurus 기반 Notion 스타일 개인 포트폴리오 사이트

## 개요

| 항목 | 내용 |
|------|------|
| **기간** | 2026.01 ~ 진행 중 |
| **역할** | 기획, 디자인, 프론트엔드 개발 |
| **기술 스택** | React, TypeScript, Docusaurus, CSS Modules |
| **배포** | GitHub Pages |
| **상태** | 🟡 진행 중 |

## 프로젝트 배경

개인 포트폴리오와 기술 블로그를 하나의 사이트로 관리하고 싶었다. 기존에 Notion으로 정리하던 내용들을 웹사이트로 옮기면서, Notion의 깔끔한 UI를 살리되 커스터마이징이 자유로운 형태로 만들고자 했다.

## 주요 기능

### Notion 스타일 디자인 시스템
- CSS Custom Properties 기반 테마 토큰 (`--notion-bg`, `--notion-text`, `--notion-card-bg` 등)
- 다크모드/라이트모드 자동 전환 (시스템 설정 연동)
- Pretendard 웹폰트 적용

### 데이터베이스 뷰 컴포넌트
프로젝트 목록을 Notion의 Database처럼 6가지 뷰로 볼 수 있도록 구현:
- **갤러리 뷰**: 카드 형태로 프로젝트 썸네일 표시
- **테이블 뷰**: 상태 뱃지가 있는 스프레드시트 형태
- **보드 뷰**: 상태별 칸반 보드
- **타임라인 뷰**: 월별 간트 차트
- **리스트 뷰**: 심플한 목록 형태
- **캘린더 뷰**: 날짜 범위 바가 있는 달력

### 데이터 관리
- 홈페이지 전체 콘텐츠를 `homeData.json` 하나로 관리
- 블로그 태그와 Tech Stack 연동 (기술 클릭 시 관련 글 목록으로 이동)

## 기술적 도전

### CSS 변수 기반 테마 시스템
컴포넌트마다 `[data-theme='dark']` 셀렉터를 쓰는 대신, `:root`와 `[data-theme='dark']`에서 CSS 변수만 바꿔주는 방식을 사용했다. 컴포넌트 CSS에서는 변수만 참조하면 되니까 다크모드 대응 코드가 대폭 줄었다.

```css
:root {
  --notion-bg: #ffffff;
  --notion-text: #37352f;
}
[data-theme='dark'] {
  --notion-bg: #191919;
  --notion-text: #ffffffcf;
}
```

### 캘린더 범위 바 구현
프로젝트 기간을 캘린더에 범위 바로 표시하는 게 생각보다 까다로웠다. 주(week) 경계에서 바가 끊기면서도 시각적으로 연결되어 보이도록 `isStart`, `isEnd` 플래그로 모서리 둥글기를 제어했다.

## 배운 점

- Docusaurus의 커스터마이징 방법과 한계
- CSS Modules + CSS Custom Properties 조합의 장점
- React 컴포넌트 설계 시 props 인터페이스 설계의 중요성
- JSON 기반 콘텐츠 관리의 편의성

## 스크린샷

*추후 추가 예정*
