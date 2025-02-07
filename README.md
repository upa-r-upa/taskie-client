# Taskie

태스키는 투두, 루틴, 습관 서비스 모두를 한번에 관리할 수 있는 일정 관리 앱입니다.

서비스의 더욱 자세한 설명은 [해당 레포지터리](https://github.com/upa-r-upa/taskie-backend)에 설명되어 있습니다.

배포된 서비스는 [여기](https://taskie.upa-r-upa.com/login) 입니다(베타 버전). 로그인 이후 사용할 수 있습니다.

# 스펙

- React + TS + vite
- daisyui + tailwindcss
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


# 서비스 화면

## 메인 페이지

| ![메인 1](https://github.com/user-attachments/assets/11dd99ed-f31b-4f24-af71-1fc9af9bb99e) | ![메인 2](https://github.com/user-attachments/assets/67314baf-015a-4720-b13c-505625f76b12) |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                                       메인 페이지 1                                        |                                       메인 페이지 2                                        |

## Todo 서비스

| ![Todo](https://github.com/user-attachments/assets/0dc7628b-6d9b-4bf6-9beb-8a448b1cb3cd)|
| :--------------------------------------------------------------------------------------: |
|                                       Todo 서비스                                        |

## Routine 서비스
| ![Routine 1](https://github.com/user-attachments/assets/c0032cf2-ea05-4c28-8152-8a16cc8812ae) | ![Routine 2](https://github.com/user-attachments/assets/793e0bdf-c553-4b8b-98ec-93a4673bafb6) | ![Routine 3](https://github.com/user-attachments/assets/821949cc-1fc0-4e42-b406-db5d962acd6b) |
| :-----------------------------------------------: | :-----------------------------------------------: | :-----------------------------------------------: |
| Routine 1 | Routine 2 | Routine 3 |




## Habit 서비스 (개발 진행중)

| ![Habit](https://github.com/user-attachments/assets/12026dfe-0243-4df1-8d91-501dcbc52b66) |
| :---------------------------------------------------------------------------------------: |
|                                       Habit 서비스                                        |

