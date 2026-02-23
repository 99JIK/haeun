---
slug: docker-basics
title: Docker 기초 - 개발 환경을 컨테이너로 관리하기
authors: [haeun]
tags: [docker, linux, dev]
---

"내 컴에서는 되는데?" 문제를 해결하기 위해 Docker를 공부하기 시작했다. 기본 개념과 자주 쓰는 명령어를 정리.

<!-- truncate -->

## Docker가 뭔데

애플리케이션과 그 실행 환경을 **컨테이너**로 패키징하는 도구. 어떤 컴퓨터에서든 동일한 환경으로 실행할 수 있다.

- **이미지**: 컨테이너의 설계도 (읽기 전용)
- **컨테이너**: 이미지를 실행한 인스턴스 (읽기/쓰기)
- **Dockerfile**: 이미지를 만드는 레시피

## Dockerfile 예시

Node.js 앱을 컨테이너로 만드는 경우:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

## 자주 쓰는 명령어

```bash
# 이미지 빌드
docker build -t my-app .

# 컨테이너 실행
docker run -d -p 3000:3000 my-app

# 실행 중인 컨테이너 확인
docker ps

# 컨테이너 중지
docker stop <container-id>

# 컨테이너 로그 보기
docker logs <container-id>
```

## docker-compose

여러 컨테이너를 한번에 관리할 때. 프론트 + 백엔드 + DB를 한 명령어로 띄울 수 있다.

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydb
    ports:
      - "3306:3306"
```

```bash
docker-compose up -d    # 전체 시작
docker-compose down     # 전체 중지
```

## 정리

| 개념 | 설명 |
|------|------|
| Image | 실행 환경의 스냅샷 |
| Container | 이미지의 실행 인스턴스 |
| Dockerfile | 이미지 빌드 스크립트 |
| docker-compose | 다중 컨테이너 관리 |
| Volume | 데이터 영속화 |
