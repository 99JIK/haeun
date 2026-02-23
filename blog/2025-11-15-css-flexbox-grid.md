---
slug: css-flexbox-grid
title: CSS Flexbox vs Grid 한눈에 비교
authors: [haeun]
tags: [css, web]
---

Flexbox랑 Grid 중 뭘 써야 할지 항상 고민됐는데, 결론부터 말하면 "1차원이면 Flex, 2차원이면 Grid".

<!-- truncate -->

## Flexbox - 한 방향 레이아웃

가로 **또는** 세로, 한 축을 기준으로 아이템을 배치할 때.

```css
.nav {
  display: flex;
  justify-content: space-between;  /* 가로 정렬 */
  align-items: center;             /* 세로 정렬 */
  gap: 16px;
}
```

자주 쓰는 패턴:
- 네비게이션 바
- 카드를 가로로 나열
- 수직 가운데 정렬
- 아이템 간격 균등 분배

## Grid - 행 + 열 레이아웃

가로 **그리고** 세로, 2차원으로 배치할 때.

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

자주 쓰는 패턴:
- 대시보드 레이아웃
- 이미지 갤러리
- 전체 페이지 레이아웃
- 카드 그리드

## 비교 정리

| | Flexbox | Grid |
|--|---------|------|
| **축** | 1차원 (가로 or 세로) | 2차원 (가로 + 세로) |
| **용도** | 컴포넌트 내부 정렬 | 페이지/섹션 레이아웃 |
| **아이템 크기** | 콘텐츠 기반 | 트랙(행/열) 기반 |
| **반응형** | flex-wrap | grid-template + minmax |

## 실전 팁

사실 둘 다 같이 쓰는 경우가 가장 많다:
- **Grid**로 전체 레이아웃 잡고
- **Flex**로 각 셀 안의 콘텐츠를 정렬

```css
/* 전체 레이아웃은 Grid */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
}

/* 카드 내부 정렬은 Flex */
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```
