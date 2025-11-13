# AMU_Front 🎵

AMU는 음악을 공유하고 즐길 수 있는 웹 기반 음악 스트리밍 플랫폼입니다.

## 📋 프로젝트 소개

AMU_Front는 React를 기반으로 개발된 음악 스트리밍 서비스의 프론트엔드 애플리케이션입니다. 사용자들이 음악을 업로드하고, 재생하며, 플레이리스트를 관리하고, 다른 사용자들과 음악을 공유할 수 있는 플랫폼을 제공합니다.

## ✨ 주요 기능

### 🔐 사용자 인증
- 회원가입 및 로그인
- 사용자 프로필 관리

### 🎵 음악 기능
- 음악 업로드
- 음악 재생 및 제어
- 음악 상세 정보 조회
- 가사 표시
- 미니 플레이어

### 📝 소셜 기능
- 음악에 대한 댓글/리뷰 작성
- 좋아하는 음악 관리
- 사용자 프로필 조회

### 📂 플레이리스트
- 플레이리스트 생성 및 관리
- 재생 목록 트랙 관리
- 내가 업로드한 음악 관리
- 내가 좋아하는 음악 목록

## 🛠️ 기술 스택

### Frontend
- **React** 18.3.1 - UI 프레임워크
- **React Router** 6.28.0 - 라우팅
- **React Bootstrap** 2.10.5 - UI 컴포넌트
- **Styled Components** 6.1.13 - 스타일링
- **Axios** 1.7.7 - HTTP 클라이언트
- **use-sound** 4.0.3 - 오디오 재생

### Development Tools
- **Create React App** - 프로젝트 설정
- **http-proxy-middleware** - 개발 프록시

## 📦 설치 및 실행

### 사전 요구사항
- Node.js (권장 버전: 14.x 이상)
- npm 또는 yarn

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/yongqyu49/AMU_Front.git
cd AMU_Front
```

2. 의존성 패키지 설치
```bash
npm install
```

3. 환경 설정
- 백엔드 서버가 `http://localhost:8787`에서 실행되고 있어야 합니다.
- 필요시 `package.json`의 `proxy` 설정을 수정하세요.

4. 개발 서버 실행
```bash
npm start
```

애플리케이션이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📜 Available Scripts

### `npm start`
개발 모드로 앱을 실행합니다.
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### `npm test`
테스트 러너를 인터랙티브 워치 모드로 실행합니다.

### `npm run build`
프로덕션용 앱을 `build` 폴더에 빌드합니다.
React를 프로덕션 모드로 번들링하고 최적화합니다.

## 🗂️ 프로젝트 구조

```
AMU_Front/
├── public/                # 정적 파일
├── src/
│   ├── component/        # React 컴포넌트
│   │   ├── music/       # 음악 관련 컴포넌트
│   │   ├── playlist/    # 플레이리스트 컴포넌트
│   │   └── user/        # 사용자 관련 컴포넌트
│   ├── css/             # 스타일시트
│   ├── hooks/           # 커스텀 React Hooks
│   ├── img/             # 이미지 리소스
│   ├── App.jsx          # 메인 앱 컴포넌트
│   └── index.js         # 엔트리 포인트
├── package.json         # 프로젝트 의존성
└── README.md           # 프로젝트 문서
```

## 🔌 API 연동

이 프론트엔드 애플리케이션은 백엔드 API 서버와 통신합니다.
- 기본 API 엔드포인트: `http://localhost:8787`
- 프록시 설정이 개발 환경에서 자동으로 처리됩니다.

## 🌐 주요 라우트

- `/` - 메인 콘텐츠 페이지
- `/signIn` - 로그인
- `/signUp` - 회원가입
- `/mainPage` - 메인 페이지
- `/upload` - 음악 업로드
- `/feed` - 플레이어 피드
- `/profile/:id` - 사용자 프로필
- `/music/:musicCode` - 음악 상세 정보

## 📧 백엔드

백엔드 깃허브: https://github.com/yongqyu49/AMU_Back/
