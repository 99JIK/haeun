---
slug: typescript-generic
title: TypeScript 제네릭 쉽게 이해하기
authors: [haeun]
tags: [typescript, dev]
---

TypeScript를 쓰면서 제네릭을 처음 봤을 때 꺾쇠 괄호가 무섭게 느껴졌는데, 알고 보면 "나중에 정할게"라는 의미밖에 없다.

<!-- truncate -->

## 제네릭이 뭔데

함수나 타입을 만들 때, 특정 타입에 묶이지 않고 **사용할 때 타입을 지정**할 수 있게 해주는 기능이다.

```typescript
// 제네릭 없이 - any 쓰면 타입 안전성이 사라짐
function getFirst(arr: any[]): any {
  return arr[0];
}

// 제네릭으로 - 타입이 보존됨
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);       // number
const str = getFirst(['a', 'b', 'c']); // string
```

`T`는 그냥 플레이스홀더다. 아무 이름이나 써도 되지만 관례적으로 `T`, `U`, `K`, `V` 등을 쓴다.

## 실제로 많이 쓰는 패턴

### API 응답 타입

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 사용할 때 구체적인 타입을 넣으면 됨
type UserResponse = ApiResponse<User>;
type PostResponse = ApiResponse<Post[]>;
```

### 제약 조건 (extends)

아무 타입이나 들어오면 안 되는 경우에 `extends`로 제한할 수 있다.

```typescript
// length 속성이 있는 타입만 허용
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength('hello');     // OK
logLength([1, 2, 3]);   // OK
logLength(123);         // Error!
```

## 정리

- 제네릭 = "타입을 파라미터로 받는 것"
- `any` 대신 제네릭을 쓰면 타입 안전성을 유지하면서 재사용 가능한 코드를 만들 수 있음
- `extends`로 제네릭에 제약 조건을 걸 수 있음
