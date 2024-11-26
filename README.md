# 청년을 위한 맞춤 정책 - 온청

청년을 위한 지역별 복지사업 추천 서비스

<br/>

```
📦 프로젝트 루트
├── assets # 이미지, 폰트, SVG 등 정적 자산
│ └── … # 이미지 파일 등
├── node_modules # 프로젝트 의존성 패키지 디렉토리
├── src # 소스 코드 디렉토리
│ ├── components # 재사용 가능한 UI 컴포넌트
│ │ ├── Button.tsx # 버튼 컴포넌트
│ │ └── …
│ ├── constants # 상수 정의 파일
│ │ └── Colors.ts # 색상 정의
│ ├── hooks # 커스텀 훅 정의
│ │ └── useAuth.ts # 인증 관련 훅
│ ├── navigation # 네비게이션 관련 코드
│ │ └── AppNavigator.tsx # 앱 네비게이터 설정
│ ├── screens # 앱 화면(스크린) 컴포넌트
│ │ ├── HomeScreen.tsx # 홈 화면
│ │ └── …
│ ├── services # API 호출 및 외부 서비스 연동
│ │ └── api.ts # API 설정
│ ├── store # 상태 관리 관련 코드 (예: Redux, Zustand)
│ │ └── useStore.ts # 전역 상태 관리 훅
│ └── App.tsx # 앱의 진입점 컴포넌트
├── .gitignore # Git에서 무시할 파일 및 디렉토리 설정
├── app.json # Expo 앱 설정 파일
├── package.json # 프로젝트 설정 및 종속성 관리 파일
├── tsconfig.json # TypeScript 설정 파일
└── README.md # 프로젝트 설명서
```

---

## 📦 주요 라이브러리 및 버전

| 라이브러리                    | 버전     | 설명                                            |
| ----------------------------- | -------- | ----------------------------------------------- |
| react                         | 18.3.1   | 인터페이스를 구축하기 위한 라이브러리           |
| react-dom                     | 18.3.1   | React 컴포넌트의 DOM 렌더링 도구                |
| react-native                  | 0.76.3   | React Native 프레임워크                         |
| @react-navigation/native      | 7.0.0    | React Native 기반의 네비게이션 라이브러리       |
| @react-navigation/bottom-tabs | 7.0.0    | React Native 하단 탭 네비게이션 구현 라이브러리 |
| expo                          | 52.0.11  | React Native 앱 개발을 위한 도구 및 런타임 환경 |
| expo-router                   | 4.0.9    | Expo 환경에서의 파일 기반 라우터                |
| expo-constants                | ~17.0.3  | 네이티브 앱의 상수 정보를 제공                  |
| expo-status-bar               | ~2.0.0   | 상태 바를 제어하기 위한 라이브러리              |
| expo-font                     | ~13.0.1  | 커스텀 폰트를 로드 및 사용할 수 있게 지원       |
| expo-splash-screen            | ~0.29.13 | Splash Screen 구현 라이브러리                   |
| react-native-reanimated       | ~3.16.1  | 애니메이션 효과를 위한 고성능 라이브러리        |
| react-native-gesture-handler  | ~2.20.2  | React Native에서 제스처 처리를 위한 라이브러리  |
| react-native-webview          | 13.12.2  | React Native에서 WebView를 제공                 |
| typescript                    | ^5.3.3   | 정적 타입 체크 및 향상된 코드 품질 제공         |

---

## 🚀 실행 방법

1. **의존성 설치**

   ```zsh
   npm install
   ```

   **expo-cli 설치**

   ```zsh
   npm install -g expo-cli
   ```

2. **Expo Build 실행**

   ```zsh
   npx expo build:android
   npx expo build:ios
   ```

3. **개발 서버 실행**

   ```zsh
   npx expo start
   ```
