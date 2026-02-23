---
slug: linux-commands
title: 리눅스 기본 명령어 치트시트
authors: [haeun]
tags: [linux, dev]
---

서버 접속할 때마다 명령어가 기억 안 나서 정리해둔다. 자주 쓰는 것 위주로.

<!-- truncate -->

## 파일/디렉토리

```bash
ls -la          # 숨김 파일 포함 상세 목록
cd ~/project    # 홈 디렉토리 하위로 이동
pwd             # 현재 경로 확인

mkdir -p a/b/c  # 중간 디렉토리까지 한번에 생성
cp -r src dest  # 디렉토리 복사
mv old new      # 이름 변경 / 이동
rm -rf dir      # 디렉토리 삭제 (주의!)

cat file        # 파일 전체 출력
head -20 file   # 처음 20줄
tail -f log     # 로그 실시간 추적
```

## 검색

```bash
find . -name "*.py"              # 파일 찾기
grep -r "TODO" ./src             # 텍스트 검색
grep -rn "function" --include="*.js"  # 줄 번호 포함
```

## 프로세스

```bash
ps aux          # 모든 프로세스 보기
top             # 실시간 리소스 모니터링
kill -9 <pid>   # 프로세스 강제 종료

# 포트 사용 중인 프로세스 찾기
lsof -i :3000
```

## 권한

```bash
chmod 755 script.sh    # rwxr-xr-x
chmod +x script.sh     # 실행 권한 추가
chown user:group file  # 소유자 변경
```

권한 숫자 읽는 법: `r=4, w=2, x=1`
- `755` = 소유자(7=rwx) + 그룹(5=r-x) + 기타(5=r-x)

## 네트워크

```bash
curl https://api.example.com     # HTTP 요청
wget https://example.com/file    # 파일 다운로드
ssh user@host                    # 원격 접속
scp file user@host:/path         # 파일 전송
```

## 유용한 조합

```bash
# 파이프로 조합
cat log.txt | grep "ERROR" | wc -l   # 에러 개수 세기

# 출력 리다이렉트
command > output.txt    # 덮어쓰기
command >> output.txt   # 추가

# 백그라운드 실행
nohup ./server &
```
