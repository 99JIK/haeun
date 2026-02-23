---
slug: python-collections
title: 코테에서 유용한 Python collections 모듈
authors: [haeun]
tags: [python, algorithm]
---

Python으로 코딩 테스트를 풀 때 `collections` 모듈을 알면 코드가 확 줄어든다. 자주 쓰는 것들만 정리.

<!-- truncate -->

## Counter

리스트에서 각 원소의 개수를 셀 때. `dict`로 직접 세는 것보다 훨씬 간결하다.

```python
from collections import Counter

words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
count = Counter(words)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# 가장 흔한 2개
count.most_common(2)  # [('apple', 3), ('banana', 2)]
```

## defaultdict

존재하지 않는 키에 접근할 때 기본값을 자동 생성. `if key not in dict` 체크가 사라진다.

```python
from collections import defaultdict

graph = defaultdict(list)
edges = [(1, 2), (1, 3), (2, 4)]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)
# {1: [2, 3], 2: [1, 4], 3: [1], 4: [2]}
```

## deque

양쪽 끝에서 O(1)으로 삽입/삭제. BFS할 때 필수.

```python
from collections import deque

queue = deque([1, 2, 3])
queue.append(4)      # 오른쪽 추가
queue.appendleft(0)  # 왼쪽 추가
queue.popleft()      # 왼쪽 제거 (0)
```

리스트의 `pop(0)`은 O(n)이니까 큐가 필요하면 반드시 `deque`를 쓰자.

## 정리

| 클래스 | 용도 | 코테 활용 |
|--------|------|-----------|
| Counter | 빈도 세기 | 문자열 아나그램, 투표 |
| defaultdict | 기본값 딕셔너리 | 그래프 인접 리스트 |
| deque | 양방향 큐 | BFS, 슬라이딩 윈도우 |
