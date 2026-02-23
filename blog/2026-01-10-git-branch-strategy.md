---
slug: git-branch-strategy
title: Git 브랜치 전략 정리 (Git Flow vs GitHub Flow)
authors: [haeun]
tags: [git, dev]
---

팀 프로젝트를 하면서 브랜치를 어떻게 관리할지 고민이 많았다. Git Flow와 GitHub Flow를 비교하면서 정리한 내용.

<!-- truncate -->

## Git Flow

Vincent Driessen이 제안한 전통적인 브랜치 모델. 브랜치가 많고 체계적이다.

```
main ─────────────────────────── (배포된 코드)
  └── develop ────────────────── (개발 중인 코드)
        ├── feature/login ────── (기능 개발)
        ├── feature/signup ───── (기능 개발)
        └── release/1.0 ──────── (배포 준비)
```

- **main**: 배포된 안정 버전
- **develop**: 다음 릴리스를 위한 개발 브랜치
- **feature/\***: 기능별 브랜치 (develop에서 분기, develop으로 머지)
- **release/\***: 배포 전 QA 브랜치
- **hotfix/\***: 긴급 버그 수정

## GitHub Flow

GitHub에서 사용하는 심플한 모델. 브랜치가 단순하다.

```
main ─────────────────────────── (항상 배포 가능한 상태)
  ├── feature/login ────────────
  └── fix/navbar-bug ───────────
```

1. `main`에서 브랜치 생성
2. 작업 후 커밋
3. Pull Request 생성
4. 코드 리뷰
5. `main`에 머지 → 자동 배포

## 비교

| | Git Flow | GitHub Flow |
|--|----------|-------------|
| **복잡도** | 높음 | 낮음 |
| **브랜치 수** | 5종류 | 2종류 (main + feature) |
| **적합한 프로젝트** | 릴리스 주기가 있는 프로젝트 | CI/CD 기반 지속 배포 |
| **팀 규모** | 중~대규모 | 소~중규모 |

## 학교 팀프에서는

GitHub Flow를 추천한다. 이유:
- 브랜치 구조가 단순해서 팀원들이 빠르게 적응
- PR 기반 코드 리뷰를 자연스럽게 할 수 있음
- `main` 브랜치가 항상 동작하는 상태를 유지하는 습관이 생김

## 커밋 메시지 컨벤션

브랜치 전략만큼 중요한 게 커밋 메시지. Conventional Commits를 쓰면 로그가 깔끔해진다.

```
feat: 로그인 폼 UI 구현
fix: 네비게이션 바 모바일 깨짐 수정
docs: README 업데이트
refactor: API 통신 레이어 리팩토링
```
