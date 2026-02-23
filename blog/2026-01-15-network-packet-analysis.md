---
slug: network-packet-analysis
title: Wireshark로 네트워크 패킷 분석하기
authors: [haeun]
tags: [network, linux]
---

네트워크 보안 수업에서 Wireshark로 패킷을 직접 캡처하고 분석하는 실습을 했다. 핵심 내용을 정리.

<!-- truncate -->

## Wireshark란

네트워크 인터페이스를 통과하는 **패킷을 실시간으로 캡처**하고 분석할 수 있는 도구. 네트워크 보안 분석에서 필수.

## 기본 사용법

### 캡처 시작

1. 인터페이스 선택 (Wi-Fi, Ethernet 등)
2. 캡처 시작 버튼 클릭
3. 패킷이 실시간으로 목록에 표시됨

### 디스플레이 필터

특정 패킷만 보고 싶을 때 사용.

```
# HTTP 패킷만 보기
http

# 특정 IP만 보기
ip.addr == 192.168.1.100

# TCP 포트 필터
tcp.port == 443

# DNS 쿼리만 보기
dns

# HTTP POST 요청만 보기
http.request.method == "POST"

# 조합
ip.src == 192.168.1.1 && tcp.port == 80
```

## TCP 3-Way Handshake 확인

```
Client → Server: SYN          (seq=0)
Server → Client: SYN, ACK     (seq=0, ack=1)
Client → Server: ACK           (seq=1, ack=1)
```

Wireshark에서 `tcp.flags.syn == 1`으로 필터링하면 핸드셰이크 과정을 볼 수 있다.

## HTTP vs HTTPS 비교

### HTTP (암호화 없음)

HTTP 패킷을 캡처하면 **요청/응답 본문이 그대로 보인다**. 로그인 폼의 아이디/비밀번호도 평문으로 노출됨.

### HTTPS (TLS 암호화)

TLS로 암호화되어 있어서 Application Data가 **암호문으로 표시**. 어떤 도메인에 접속하는지 정도만 SNI(Server Name Indication)에서 확인 가능.

## ARP 스푸핑 탐지

같은 네트워크에서 ARP 스푸핑 공격이 발생하면:

```
# ARP 이상 탐지 필터
arp.duplicate-address-detected
```

동일 IP에 대해 MAC 주소가 바뀌면 스푸핑 의심.

## 실습에서 배운 점

- 공개 Wi-Fi에서 HTTP 사이트 이용 시 패킷 스니핑으로 정보 탈취 가능
- HTTPS의 중요성을 직접 눈으로 확인할 수 있음
- `Follow TCP Stream`으로 하나의 연결 전체를 추적 가능

## 정리

| 기능 | 필터 |
|------|------|
| HTTP 트래픽 | `http` |
| 특정 IP | `ip.addr == x.x.x.x` |
| DNS 조회 | `dns` |
| TLS 핸드셰이크 | `tls.handshake` |
| TCP SYN | `tcp.flags.syn == 1` |

- Wireshark = 네트워크 트래픽의 현미경
- 패킷 레벨에서 프로토콜 동작을 이해할 수 있음
- 보안 분석의 기본 도구
