# haeun - 포트폴리오 & 기술 블로그

[Docusaurus](https://docusaurus.io/)로 Notion 스타일로 만들어 뒀고, 다크모드/라이트모드 다 되고 모바일에서도 잘 나올거야.

---

## 시작하기

```bash
# 처음이면 이것부터
npm install

# 개발 서버 켜기 (http://localhost:3000)
npm run start

# 배포할 때 근데 배포할 일 없을듯?
npm run build
```

`npm run start` 켜두면 파일 저장할 때마다 바로바로 반영되니까 편하게 쓰면 돼.

---

## 폴더 구조

자주 건드릴 파일들만 추리면 이 정도야:

```
haeun/
├── src/data/homeData.json      <- 홈페이지 내용 여기서 다 관리
├── blog/                       <- 블로그 글 쓰는 곳
│   ├── authors.yml             <- 작성자 정보
│   └── tags.yml                <- 태그 목록
├── project/                    <- 프로젝트 문서 쓰는 곳
│   └── done/                   <- 완료 프로젝트별 상세 페이지
│   └── in-progress/            <- 진행 프로젝트별 상세 페이지
├── static/img/                 <- 이미지 넣는 곳
└── docusaurus.config.ts        <- 사이트 설정
```

---

## 홈페이지 수정

홈에 보이는 내용은 전부 **`src/data/homeData.json`** 하나로 관리돼.
이 파일만 고치면 홈페이지가 너가 원하는 정보를 게시하는 쪽으로 바뀌게 구조화해놨어.

### 프로필

```json
{
  "profile": {
    "avatarUrl": "img/favicon.svg",
    "name": "이하은",
    "subtitle": "Computer Science Student",
    "tagline": "소개 문구"
  }
}
```

### 프로젝트 추가하기

`projects` 배열에 하나 더 넣으면 돼:

```json
{
  "id": "5",
  "title": "프로젝트명",
  "startDate": "2025-03-01",
  "endDate": "2025-06-30",
  "owner": "이하은",
  "description": "한 줄 설명",
  "image": "이미지 URL (없으면 빈 문자열)",
  "status": "In Progress",
  "pageUrl": "/project/done/파일명"
}
```

- `status`는 `"In Progress"` / `"Done"` / `"To Do"` 중 하나
- `project/done/` 폴더에 마크다운 파일도 같이 만들어야 연결돼

### Tech Stack

```json
{
  "skills": [
    {
      "category": "카테고리명",
      "items": [
        { "icon": "아이콘", "label": "기술명", "href": "/blog/tags/태그명" }
      ]
    }
  ]
}
```

블로그 글에 `tags: [typescript]` 넣어두면, Tech Stack에서 TypeScript 눌렀을 때 그 글들이 쭉 나와.

### Contact

```json
{
  "contact": {
    "links": [
      { "icon": "🐙", "label": "GitHub", "href": "https://...", "external": true }
    ]
  }
}
```

`external: true`면 새 탭으로 열리고, `false`면 사이트 안에서 이동해.

---

## 블로그 글 쓰기

`blog/` 폴더에 마크다운 파일 하나 만들면 끝이야.

### 파일명

```
blog/YYYY-MM-DD-제목.md
```

예: `blog/2025-02-13-first-post.md`

### 글 양식

```markdown
---
slug: my-post
title: 글 제목
authors: [haeun]
tags: [typescript, react]
---

여기부터 본문, 참고로 MDX 기반으로 화면을 구성하기 때문에 <> 이렇게 쓰면 안되고 
\<
\>
이런 식으로 수식으로 오인할 수 있는 특수문자들은 그대로 작성하기 위해서는 backslash를 앞에 기입해야 해.
<!-- truncate -->

이 밑에 쓴 내용은 목록에서 안 보이고 "더 보기" 누르면 나와.
```

- `slug`: URL 경로 (`/blog/my-post`)
- `authors`: `blog/authors.yml`에 있는 작성자
- `tags`: `blog/tags.yml`에 있는 태그 (홈 Tech Stack이랑 연동됨)

### 작성자 설정 (`blog/authors.yml`)

```yaml
haeun:
  name: 이하은
  title: Computer Science Student
  url: https://github.com/izzru
  image_url: /img/favicon.svg
```

---

## 프로젝트 페이지 추가

`project/done/`에 `.md` 파일 만들면 돼:

```markdown
---
sidebar_position: 번호
title: 프로젝트명
---

# 프로젝트명

자유롭게 작성 (마크다운 다 됨)
```

홈 화면에도 보이게 하려면 `homeData.json`의 `projects`에도 넣는 거 잊지 말고!

---

## 명령어 정리

| 명령어 | 설명 |
|--------|------|
| `npm run start` | 개발 서버 (실시간 미리보기) |
| `npm run build` | 배포용 빌드 |
| `npm run serve` | 빌드된 거 로컬에서 확인 |
| `npm run clear` | 캐시 날리기 (안 될 때 한번 써봐) |

---

## GitHub Pages 배포

이미 자동 배포가 세팅되어 있어서, `main` 브랜치에 push만 하면 알아서 빌드되고 배포돼.

처음 한 번만 GitHub 설정을 해주면 돼:

1. GitHub에서 `haeun` 리포지토리로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source** 항목을 **GitHub Actions**로 변경
5. 저장하면 끝!

그 다음부터는 이렇게만 하면 돼:

```bash
git add .
git commit -m "내용 수정"
git push
```

push하면 `.github/workflows/deploy.yml`이 자동으로 돌아가서 빌드 + 배포해줘.
배포 완료되면 `https://izzru.github.io/haeun/` 에서 확인 가능해.

배포 상태는 GitHub 리포지토리의 **Actions** 탭에서 볼 수 있어. 초록색 체크면 성공, 빨간색 X면 빌드 에러난 거니까 로그 확인해보면 돼.

---

## 팁

- `npm run start` 켜놓고 작업하면 저장할 때마다 바로 확인 가능
- 이미지는 `static/img/`에 넣고 `![설명](/img/파일명.png)`으로 불러오면 됨
- 빌드가 이상하면 `npm run clear` 한번 돌리고 다시 해봐
- VSCode에서 마크다운 미리보기: `Ctrl+Shift+V`, 근데 [옵시디언](https://obsidian.md/) 쓰는 걸 진짜진짜진짜로 추천

뭔가 안 되거나 모르겠으면 편하게 물어봐!

\- 불쌍한 대학원생 김정인
