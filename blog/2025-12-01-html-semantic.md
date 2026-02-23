---
slug: html-semantic
title: 시맨틱 HTML 태그, 왜 써야 할까
authors: [haeun]
tags: [html, web]
---

`div`만 써도 화면은 똑같이 나오는데, 왜 굳이 시맨틱 태그를 쓰라는 건지 처음엔 이해 못했다. 접근성과 SEO를 공부하면서 이유를 알게 됐다.

<!-- truncate -->

## 시맨틱 태그란

태그 이름만 봐도 **콘텐츠의 의미를 알 수 있는** HTML 태그.

```html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- Semantic -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
```

화면에 보이는 건 같지만, 두 번째가 훨씬 의미가 명확하다.

## 주요 시맨틱 태그

| 태그 | 용도 |
|------|------|
| `header` | 페이지/섹션의 헤더 |
| `nav` | 네비게이션 링크 모음 |
| `main` | 페이지의 주요 콘텐츠 (1개만) |
| `article` | 독립적인 콘텐츠 (블로그 글, 뉴스 등) |
| `section` | 주제별 콘텐츠 그룹 |
| `aside` | 부가 정보 (사이드바) |
| `footer` | 페이지/섹션의 푸터 |
| `figure` | 이미지, 도표 등과 캡션 |
| `time` | 날짜/시간 |

## 왜 써야 하는가

### 1. 접근성 (Accessibility)
스크린 리더가 시맨틱 태그를 인식해서 시각장애인에게 페이지 구조를 알려줄 수 있다. `nav`가 있으면 "네비게이션 영역"이라고 안내해줌.

### 2. SEO
검색 엔진이 `article` 안의 콘텐츠가 핵심 내용이라는 걸 파악할 수 있다. `div`만 쓰면 뭐가 중요한지 알 수 없음.

### 3. 유지보수
코드를 읽을 때 `div` 20개보다 시맨틱 태그가 구조를 훨씬 빨리 파악할 수 있다.

## 정리

- `div`는 의미 없는 컨테이너. 스타일링 목적으로만 사용
- 콘텐츠에 의미가 있으면 해당하는 시맨틱 태그를 먼저 고려
- 접근성, SEO, 가독성 모두에 도움이 됨
