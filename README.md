# Taskie
태스키는 투두, 루틴, 습관 서비스 모두를 한번에 관리할 수 있는 일정 관리 앱입니다.

서비스의 더욱 자세한 설명은 [해당 레포지터리](https://github.com/upa-r-upa/taskie-backend)에 설명되어 있습니다. 

현재 서비스는 임시로 모바일 뷰로만 제공중입니다. 

배포된 서비스는 [여기](https://taskie.upa-r-upa.com/login) 입니다. 현재 정식 배포가 아닌 상태로, 많이 불안정합니다. 열심히 개발 진행중입니다. 

# 서비스 화면


## 메인 페이지
| ![메인 1](https://github.com/user-attachments/assets/3f479625-f21b-4b43-b87e-eb5d02a0d85e) | ![메인 2](https://github.com/user-attachments/assets/028c708d-461b-460b-9054-d80651d8e1e1) |
|:--:|:--:|
| 메인 페이지 1 | 메인 페이지 2 |

## Todo 서비스
| ![Todo](https://github.com/user-attachments/assets/58e6600c-468c-4b7a-bc98-40415b1d874c) |
|:--:|
| Todo 서비스 |

## Routine 서비스
| ![Routine 1](https://github.com/user-attachments/assets/dd4cfe08-0ce7-4593-a8a4-6309cd3ca5ba) | ![Routine 2](https://github.com/user-attachments/assets/cd5ecacc-3510-41c3-94c5-7f5b4bb24ec3) |
|:--:|:--:|
| Routine 1 | Routine 2 |
| ![Routine 3](https://github.com/user-attachments/assets/a348e118-38d3-4f07-9a27-612218041bfc) | ![Routine 4](https://github.com/user-attachments/assets/2fb8c7b9-2708-4a8b-8ad3-417fb29325fc) |
| Routine 3 | Routine 4 |

## Habit 서비스
| ![Habit](https://github.com/user-attachments/assets/77095646-5696-454e-8bf8-e7ab78eee55b) |
|:--:|
| Habit 서비스 |

# 스펙
- Yarn
- React + TS + vite
- daisyui + tailwindcss
- zustand 

# 실행 방법
## 1. 준비
Node.js >= 16
Yarn

## 2. 레포지터리 클론
레포지터리 클론 및 패키지 설치

```bash
git clone https://github.com/upa-r-upa/taskie-client.git
cd taskie-client
```

## 3. 의존성 설치
```bash
yarn install
```

## 4. 개발 환경에 맞는 api generate
- 배포된 서버 기준으로 generate
  ```bash
yarn generate-api-test
  ```
- 로컬 서버를 기준으로 generate
  ```bash
yarn generate-api-dev
  ```

## 5. 개발 서버 실행
```bash
yarn dev
```
