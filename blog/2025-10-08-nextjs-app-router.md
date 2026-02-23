---
slug: nextjs-app-router
title: Next.js App Router 핵심 개념 정리
authors: [haeun]
tags: [nextjs, react, dev]
---

Next.js 13부터 도입된 App Router가 기존 Pages Router와 어떻게 다른지, 핵심 개념만 빠르게 정리.

<!-- truncate -->

## 폴더 기반 라우팅

`app/` 폴더 구조가 곧 URL 경로가 된다.

```
app/
├── page.tsx          -> /
├── about/
│   └── page.tsx      -> /about
├── blog/
│   ├── page.tsx      -> /blog
│   └── [slug]/
│       └── page.tsx  -> /blog/my-post
```

## Server Components vs Client Components

App Router의 가장 큰 변화. **기본이 Server Component**다.

```tsx
// Server Component (기본)
// DB 접근, API 호출 등 서버에서 실행
async function PostList() {
  const posts = await db.posts.findMany();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

```tsx
// Client Component
// useState, onClick 등 브라우저에서 실행
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## layout.tsx

공통 레이아웃. 하위 페이지가 변경돼도 레이아웃은 리렌더링되지 않는다.

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>네비게이션</nav>
        {children}
      </body>
    </html>
  );
}
```

## 정리

| 개념 | 설명 |
|------|------|
| Server Component | 서버에서 렌더링, 번들 크기 감소 |
| Client Component | `'use client'` 선언, 상호작용 필요 시 |
| layout.tsx | 공통 레이아웃, 중첩 가능 |
| loading.tsx | 로딩 UI (Suspense 기반) |
| error.tsx | 에러 UI (Error Boundary 기반) |
