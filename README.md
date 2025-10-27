# 🏰 Disney Character Universe

디즈니 캐릭터들의 마법같은 세계를 탐험하는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🎬 **7,400+ 캐릭터**: 모든 디즈니 캐릭터 데이터베이스
- 🔍 **실시간 검색**: 캐릭터 이름으로 빠른 검색
- 🎨 **스마트 필터링**: 영화, TV쇼, 게임별 필터
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지
- ⚡ **빠른 성능**: React Query를 통한 최적화된 데이터 캐싱
- 🎭 **상세 정보**: 동료, 적, 출연작 등 완벽한 정보

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Disney API (https://api.disneyapi.dev)

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone <your-repo-url>
cd disney-character-universe
```

### 2. 패키지 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 프로젝트 구조

```
disney-character-universe/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── characters/          # 캐릭터 페이지
│   │   ├── page.tsx        # 목록 페이지
│   │   └── [id]/           # 상세 페이지
│   └── globals.css          # 글로벌 스타일
├── components/              # React 컴포넌트
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── CharacterCard.tsx
│   ├── CharacterGrid.tsx
│   ├── SearchBar.tsx
│   └── FilterBar.tsx
├── lib/                     # 유틸리티 및 로직
│   ├── api/                # API 클라이언트
│   ├── hooks/              # 커스텀 훅
│   └── store/              # Zustand 스토어
└── types/                   # TypeScript 타입 정의
```

## 🌐 Vercel 배포

### 방법 1: GitHub 연동 (추천)

1. GitHub에 레포지토리 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "New Project" 클릭
4. GitHub 레포지토리 선택
5. 기본 설정으로 "Deploy" 클릭

### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 🎨 주요 컴포넌트

### CharacterCard

개별 캐릭터를 카드 형태로 표시하며, 호버 시 애니메이션 효과를 제공합니다.

### FilterBar

영화, TV쇼, 게임별로 캐릭터를 필터링할 수 있는 인터페이스를 제공합니다.

### SearchBar

실시간 캐릭터 검색 기능을 제공합니다.

## 📊 상태 관리

### Zustand Store

```typescript
- selectedFilm: 선택된 영화
- selectedTvShow: 선택된 TV쇼
- selectedGame: 선택된 게임
- searchQuery: 검색 쿼리
- currentPage: 현재 페이지
```

### React Query

- 서버 상태 캐싱 및 동기화
- 자동 재검증 및 백그라운드 업데이트
- 낙관적 업데이트 지원

## 🎯 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 스플리팅**: 자동 라우트 기반 분할
- **데이터 캐싱**: React Query의 스마트 캐싱
- **지연 로딩**: 필요할 때만 데이터 로드

## 🐛 알려진 이슈

- 일부 캐릭터는 이미지가 없을 수 있습니다 (API 제한)
- 매우 큰 페이지 번호에서는 로딩이 느릴 수 있습니다

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙏 감사의 말

- [Disney API](https://disneyapi.dev) - 훌륭한 무료 API 제공
- [Vercel](https://vercel.com) - 최고의 배포 플랫폼
- Disney - 마법같은 캐릭터들을 만들어주셔서 감사합니다 ✨

---

Made with 💜 and Next.js
