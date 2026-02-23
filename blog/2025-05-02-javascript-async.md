---
slug: javascript-async
title: JavaScript 비동기 처리 정리 (Callback → Promise → async/await)
authors: [haeun]
tags: [javascript, dev]
---

JavaScript의 비동기 처리 방식이 어떻게 발전해왔는지, 그리고 각각 언제 쓰는 게 좋은지 정리해봤다.

<!-- truncate -->

## 왜 비동기가 필요한가

JavaScript는 싱글 스레드다. API 호출이나 파일 읽기 같은 작업을 동기적으로 처리하면 그동안 화면이 멈춘다. 그래서 비동기 처리가 필수다.

## 1. Callback

가장 원시적인 방법. 함수의 인자로 "끝나면 실행할 함수"를 넘긴다.

```javascript
fetchData(url, function(data) {
  parseData(data, function(parsed) {
    saveData(parsed, function(result) {
      console.log(result);
    });
  });
});
```

문제: **콜백 지옥**. 중첩이 깊어지면 읽기도 힘들고 에러 처리도 어렵다.

## 2. Promise

콜백 지옥을 해결하기 위해 등장. `.then()` 체이닝으로 순차 실행을 표현한다.

```javascript
fetchData(url)
  .then(data => parseData(data))
  .then(parsed => saveData(parsed))
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## 3. async/await

Promise를 동기 코드처럼 쓸 수 있게 해주는 문법적 설탕(syntactic sugar).

```javascript
async function process() {
  try {
    const data = await fetchData(url);
    const parsed = await parseData(data);
    const result = await saveData(parsed);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

## 실수하기 쉬운 부분

### 병렬 실행

```javascript
// 순차 실행 (느림)
const a = await fetchA();
const b = await fetchB();

// 병렬 실행 (빠름)
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

서로 의존 관계가 없는 비동기 작업은 `Promise.all`로 동시에 실행하자.

## 정리

| 방식 | 장점 | 단점 |
|------|------|------|
| Callback | 단순 | 중첩 시 지옥 |
| Promise | 체이닝 가능 | .then 남발 |
| async/await | 가독성 최고 | try/catch 필요 |

요즘은 거의 async/await를 쓰지만, Promise의 동작 원리를 이해하고 있어야 한다.
