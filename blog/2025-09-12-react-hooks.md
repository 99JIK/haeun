---
slug: react-hooks
title: React useState vs useReducer 언제 뭘 쓸까
authors: [haeun]
tags: [react, typescript, dev]
---

상태 관리할 때 항상 `useState`만 쓰다가, 상태가 복잡해지면서 `useReducer`를 쓰게 됐다. 둘의 차이점과 선택 기준을 정리.

<!-- truncate -->

## useState

단순한 상태에 적합. 값 하나를 관리할 때 가장 직관적이다.

```tsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
```

## useReducer

상태 변경 로직이 복잡하거나, 여러 상태가 서로 연관되어 있을 때 적합.

```tsx
type State = {
  items: Item[];
  filter: string;
  isLoading: boolean;
};

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

## 선택 기준

| 상황 | 추천 |
|------|------|
| 단순 값 (boolean, string, number) | useState |
| 독립적인 상태들 | useState 여러 개 |
| 상태 간 의존 관계가 있을 때 | useReducer |
| 상태 변경 로직이 복잡할 때 | useReducer |
| 다음 상태가 이전 상태에 의존할 때 | useReducer |

개인적으로는 `useState`가 3개 이상 되면서 서로 같이 바뀌어야 하는 경우가 생기면 `useReducer`로 전환하는 편이다.
