# Taskie

- 태스키는 투두, 루틴, 습관 서비스 모두를 한번에 관리할 수 있는 일정 관리 앱입니다.
- 투두/루틴/습관에서 완료한 할 일들을 '태스크' 라는 개념으로 묶어 보여줌으로써 간편하고 효율적으로 일정 관리를 할 수 있습니다.

배포된 서비스는 [여기](https://taskie.upa-r-upa.com) 입니다(베타 버전). 로그인 이후 사용할 수 있습니다.

# 서비스 소개
## Task (태스크)
- 투두부터, 루틴 내부의 할 일, 습관 모두를 '태스크'라는 개념으로 묶어서 확인할 수 있습니다.
- 오늘의 태스크, 이번주 태스크 등으로 손쉽게 일정을 확인할 수 있습니다.
## Todo (투두) 서비스
- 가장 기본적인 할 일 관리인 투두 서비스입니다.
- **(개발 예정)** 단기 목표부터, 장기 목표까지 모두 관리할 수 있습니다.
- **(개발 예정)** 캘린더와 연동하여 할 일들을 통합해 확인할 수 있습니다. 
## Routine (루틴) 서비스
- 여러 투두를 하나의 루틴으로 묶어 순서대로, 각 필요한 시간에 맞추어 실행할 수 있습니다.
- 예를 들어 월-금 아침 7시마다 '미라클 모닝' 루틴(1. 물 마시기 (5분), 2. 명상하기 (10분), ...)을 만들어 순서대로 할 일을 진행할 수 있습니다. 
## Habit (습관) 서비스
- 특정 주기별로 반복되는 투두를 만들 수 있습니다.
- 예를 들어 '물 마시기' 습관을 매일 2시간마다 진행해 건강한 생활 습관을 만들 수 있습니다.
- 예를 들어 '이불 빨래하기' 습관을 2주 마다 반복되게 하여 자주 하지 않는 일을 까먹지 않고 관리할 수 있습니다.
- **(개발 예정)** 지정 시간마다 알림을 확인할 수 있습니다.
## 기타
- **(개발 예정)** 회원 정보 수정 기능, 아이디/비밀번호 찾기 기능 등

  
# 서비스 화면

## 메인 페이지

| ![메인 1](https://github.com/user-attachments/assets/2eed6046-521c-4f43-8f83-47f028ff4915) | ![메인 2](https://github.com/user-attachments/assets/07e37159-55bf-4762-b4c4-81d59b8f0f4a) |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                                       메인 페이지 1                                        |                                       메인 페이지 2                                        |

## Todo 서비스

| ![Todo](https://github.com/user-attachments/assets/5aeb1676-b54c-4286-9ce0-8d66dc609b93)| ![완료한 Todo](https://github.com/user-attachments/assets/61b31963-f4e3-4584-a77e-ff40dbf56c07) |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
|                                       미완료 Todo                                       |                                      완료한 Todo                                      |

## Routine 서비스
| ![Routine 1](https://github.com/user-attachments/assets/2a71bd41-451b-4bb6-8e36-2a49764ce0f8) | ![Routine 2](https://github.com/user-attachments/assets/6f877910-d078-4f4e-8b40-1187e45ec429) |
| :-----------------------------------------------: | :-----------------------------------------------: | 
| 루틴 목록 | 루틴 실행 |




## Habit 서비스 (개발 진행중)

| <img src="https://github.com/user-attachments/assets/06259540-a021-4941-96ba-bbab62f88d53" alt="Habit" width="450" /> |
| :---------------------------------------------------------------------------------------: |
|                                       습관 목록                                        | 


# 스펙

- React + TS + vite
- shadcn + tailwindcss
- zustand

# 실행 방법

## 1. 준비

- Node.js >= 21
- Pnpm 설치
  ```bash
  npm install -g pnpm
  ```

## 2. 레포지터리 클론

레포지터리 클론 및 패키지 설치

```bash
git clone https://github.com/upa-r-upa/taskie-client.git
cd taskie-client
```

## 3. 의존성 설치

```bash
pnpm install
```

## 4. 개발 환경에 맞는 api generate

- 배포된 서버 기준으로 generate

```bash
pnpm run generate-api-prod
```

- 로컬 서버를 기준으로 generate

```bash
pnpm run generate-api-local
```

## 5. 개발 서버 실행


```bash
pnpm run dev
```

# 기여

기여는 언제나 환영합니다.



# Attributions

- Sound Attribution
  Original Sound: cfork - [26875](https://freesound.org/people/cfork/sounds/26875/)
  Creator: cfork
  License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
  Modifications: The original sound has been edited (trimmed) for use in this project.
