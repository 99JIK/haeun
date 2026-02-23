---
slug: reversing-intro
title: 리버스 엔지니어링 입문 - 바이너리 분석 첫걸음
authors: [haeun]
tags: [reversing, cs]
---

리버싱 스터디를 시작하면서 배운 기초 개념들을 정리. 어셈블리부터 도구 사용법까지.

<!-- truncate -->

## 리버스 엔지니어링이란

컴파일된 바이너리를 분석해서 **원래의 동작 원리를 파악**하는 기술. 악성코드 분석, 취약점 탐색, CTF 등에서 필수적인 스킬이다.

## 알아야 할 기초 지식

### 레지스터 (x86-64)

| 레지스터 | 용도 |
|----------|------|
| `RAX` | 반환값, 범용 |
| `RBX` | 범용 (callee-saved) |
| `RCX` | 4번째 인자 (Windows) / 카운터 |
| `RDX` | 3번째 인자 |
| `RSI` | 2번째 인자 (Linux) |
| `RDI` | 1번째 인자 (Linux) |
| `RSP` | 스택 포인터 |
| `RBP` | 베이스 포인터 |
| `RIP` | 명령어 포인터 |

### 주요 어셈블리 명령어

```asm
mov rax, rbx    ; rbx 값을 rax에 복사
push rax        ; 스택에 rax 저장
pop rbx         ; 스택에서 꺼내 rbx에 저장
call 0x401000   ; 함수 호출
ret             ; 함수 반환
cmp rax, 0      ; rax와 0 비교
je 0x401050     ; 같으면 점프
jmp 0x401100    ; 무조건 점프
```

## 주요 도구

### 정적 분석

- **Ghidra**: NSA에서 만든 무료 디컴파일러. C 수준의 의사 코드로 변환해줌
- **IDA Free**: 업계 표준 디스어셈블러의 무료 버전

### 동적 분석

- **GDB + pwndbg**: Linux 디버깅
- **x64dbg**: Windows 디버깅

```bash
# GDB로 바이너리 분석
gdb ./target
(gdb) break main
(gdb) run
(gdb) disas main
(gdb) x/20x $rsp
```

## 간단한 crackme 풀이

```c
// 원본 소스 (우리는 이걸 모르는 상태에서 바이너리만 봄)
int main() {
    char input[32];
    scanf("%s", input);
    if (strcmp(input, "s3cur1ty") == 0) {
        printf("Correct!\n");
    } else {
        printf("Wrong!\n");
    }
}
```

Ghidra에서 디컴파일하면 `strcmp` 호출과 비교 문자열을 찾을 수 있다. `strings` 명령어로도 간단히 확인 가능.

```bash
strings ./crackme | grep -i correct
```

## 정리

- 리버싱 = 바이너리 → 동작 원리 파악
- 어셈블리 기초 + 도구 사용법이 핵심
- Ghidra + GDB 조합으로 시작하면 좋음
- CTF의 Reversing 문제로 연습하는 게 가장 효과적
