---
sidebar_position: 3
title: Web App Project
---

# Web App Project

React + TypeScript 기반 할 일 관리 웹 애플리케이션

## 개요

| 항목 | 내용 |
|------|------|
| **기간** | 2025.06 ~ 2025.08 |
| **팀 구성** | 프론트엔드 2명, 백엔드 1명 |
| **역할** | 프론트엔드 개발 (UI 설계, API 연동) |
| **기술 스택** | React, TypeScript, Tailwind CSS, Axios |
| **상태** | 🟢 완료 |

## 프로젝트 배경

학교 소프트웨어공학 수업의 팀 프로젝트로 진행했다. 기존 할 일 관리 앱들의 불편한 점을 분석하고, 드래그 앤 드롭과 태그 필터링 기능을 중심으로 개선된 버전을 만들었다.

## 주요 기능

### 할 일 CRUD
- 할 일 추가, 수정, 삭제, 완료 처리
- 우선순위 설정 (높음/보통/낮음)
- 마감일 지정 및 알림

### 칸반 보드
- 드래그 앤 드롭으로 상태 변경 (To Do → In Progress → Done)
- 상태별 카운트 표시

### 태그 시스템
- 자유로운 태그 생성 및 색상 지정
- 태그 기반 필터링
- 다중 태그 지원

### 사용자 기능
- JWT 기반 로그인/회원가입
- 프로필 설정
- 다크모드 지원

## 기술적 구현

### 상태 관리
Context API + useReducer 조합을 사용했다. Redux는 이 규모에서는 오버엔지니어링이라 판단했고, Context로 충분히 관리 가능했다.

```typescript
type Action =
  | \{ type: 'ADD_TODO'; payload: Todo \}
  | \{ type: 'TOGGLE_TODO'; id: string \}
  | \{ type: 'DELETE_TODO'; id: string \}
  | \{ type: 'MOVE_TODO'; id: string; status: Status \};
```

### API 통신
Axios 인스턴스를 만들어서 인터셉터로 토큰 자동 첨부와 에러 핸들링을 공통 처리했다.

### 반응형 레이아웃
Tailwind CSS의 유틸리티 클래스로 모바일/태블릿/데스크탑 대응. 모바일에서는 칸반 보드가 세로 스크롤로 전환된다.

## 내가 담당한 부분

- 전체 UI 컴포넌트 설계 및 구현
- 칸반 보드 드래그 앤 드롭 구현
- API 통신 레이어 설계
- 다크모드 구현

## 배운 점

- TypeScript를 실제 프로젝트에 적용하면서 타입 시스템의 가치를 체감
- 팀원과 API 스펙을 먼저 정의하고 개발하는 것의 중요성
- Tailwind CSS를 처음 써봤는데, 빠른 프로토타이핑에 확실히 효과적
- Git 브랜치 전략과 PR 기반 코드 리뷰 경험
