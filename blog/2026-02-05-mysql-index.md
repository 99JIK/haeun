---
slug: mysql-index
title: MySQL 인덱스, 왜 빨라지는 걸까
authors: [haeun]
tags: [database, cs]
---

DB 수업에서 "인덱스 걸면 빨라진다"고 배웠는데, 왜 빨라지는지, 언제 안 쓰는 게 나은지 정리.

<!-- truncate -->

## 인덱스가 없으면

테이블에서 특정 값을 찾으려면 **모든 행을 다 확인**해야 한다 (Full Table Scan). 100만 행이면 100만 번 비교.

```sql
-- 인덱스 없이 실행하면 Full Table Scan
SELECT * FROM users WHERE email = 'haeun@example.com';
```

## 인덱스가 있으면

인덱스는 **B+Tree** 구조로 데이터를 정렬해서 저장한다. 이진 탐색처럼 O(log n)으로 찾을 수 있다.

100만 행이어도 약 20번의 비교로 찾을 수 있음.

```sql
CREATE INDEX idx_email ON users(email);

-- 이제 B+Tree로 빠르게 찾음
SELECT * FROM users WHERE email = 'haeun@example.com';
```

## EXPLAIN으로 확인하기

```sql
EXPLAIN SELECT * FROM users WHERE email = 'haeun@example.com';
```

| type | 의미 |
|------|------|
| ALL | Full Table Scan (최악) |
| index | 인덱스 전체 스캔 |
| range | 인덱스 범위 스캔 |
| ref | 인덱스를 사용한 비교 |
| const | 상수 비교 (최고) |

`type`이 `ALL`이면 인덱스가 안 타고 있다는 뜻.

## 복합 인덱스

여러 컬럼을 묶어서 인덱스를 만들 수 있다. 순서가 중요!

```sql
CREATE INDEX idx_name_date ON orders(user_id, created_at);

-- 인덱스 탐 (왼쪽부터 매칭)
SELECT * FROM orders WHERE user_id = 1 AND created_at > '2025-01-01';

-- 인덱스 안 탐 (첫 번째 컬럼 없이 두 번째만 쓰면)
SELECT * FROM orders WHERE created_at > '2025-01-01';
```

**Leftmost Prefix Rule**: 복합 인덱스는 왼쪽 컬럼부터 순서대로 사용해야 한다.

## 인덱스의 단점

- **INSERT/UPDATE/DELETE가 느려짐**: 데이터 변경 시 인덱스도 같이 업데이트해야 함
- **저장 공간 추가 소모**
- **카디널리티가 낮은 컬럼에는 비효율**: 성별(M/F)처럼 값의 종류가 적으면 인덱스 효과가 없음

## 정리

- 인덱스 = 정렬된 참조 테이블 (B+Tree)
- 조회가 많은 컬럼에 생성
- 복합 인덱스는 순서가 중요
- EXPLAIN으로 항상 확인하는 습관
