# 🎉 Disney Character Universe - 전체 기능 가이드

## 🌙 다크모드

### 특징

- 토글 버튼으로 간편하게 전환
- 로컬 스토리지에 설정 저장
- 모든 페이지에 일관된 테마 적용
- 눈의 피로를 줄이는 부드러운 색상

### 사용법

1. 헤더 오른쪽의 🌙 버튼 클릭
2. 자동으로 다크모드 활성화
3. 다시 클릭하면 라이트모드로 전환

### 기술 구현

- **Store**: `useThemeStore` (Zustand + persist)
- **CSS**: `.dark` 클래스 기반 스타일링
- **저장**: localStorage에 자동 저장

---

## ⭐ 즐겨찾기

### 특징

- 무제한 캐릭터 저장 가능
- 로컬 스토리지에 영구 보관
- 헤더에 즐겨찾기 개수 표시
- 전용 즐겨찾기 페이지

### 사용법

1. 캐릭터 카드의 ⭐ 버튼 클릭
2. 노란색으로 변하면 즐겨찾기 추가 완료
3. 다시 클릭하면 즐겨찾기 해제
4. 헤더의 "즐겨찾기" 메뉴로 이동

### 페이지 구성

- `/favorites` - 즐겨찾기한 모든 캐릭터 표시
- 빈 상태일 때 안내 메시지 표시
- 각 캐릭터 카드에서 바로 제거 가능

### 기술 구현

```typescript
// lib/store/favoritesStore.ts
- favorites: number[] // 캐릭터 ID 배열
- addFavorite() // 추가
- removeFavorite() // 제거
- toggleFavorite() // 토글
- isFavorite() // 확인
```

---

## ⚖️ 캐릭터 비교

### 특징

- **최대 3명까지** 동시 비교
- 영화, TV쇼, 게임, 동료, 적 정보 비교
- 실시간으로 비교 목록 업데이트
- 깔끔한 그리드 레이아웃

### 사용법

1. 캐릭터 카드의 ⚖️ 버튼 클릭
2. 파란색으로 변하면 비교 목록에 추가
3. 최대 3명까지 선택 가능
4. 헤더의 "비교" 메뉴로 이동하여 비교

### 비교 정보

- 📊 출연 영화 개수 및 목록
- 📺 TV쇼 개수 및 목록
- 🎮 비디오 게임 개수 및 목록
- 👥 동료 캐릭터
- ⚔️ 적 캐릭터

### 페이지 구성

- `/compare` - 비교 페이지
- 1명: 중앙 정렬
- 2명: 2열 그리드
- 3명: 3열 그리드
- X 버튼으로 개별 제거
- "모두 제거" 버튼

### 기술 구현

```typescript
// lib/store/compareStore.ts
- compareList: number[] // 최대 3개
- addToCompare() // 추가 (최대 3개 체크)
- removeFromCompare() // 제거
- toggleCompare() // 토글
- clearCompare() // 모두 제거
```

---

## 📤 소셜 공유

### 특징

- 네이티브 Share API 사용
- iOS/Android 공유 시트 지원
- 데스크톱에서는 클립보드 복사

### 사용 위치

1. **캐릭터 카드**: 📤 버튼
2. **상세 페이지**: 오른쪽 상단 📤 버튼

### 공유 내용

```javascript
{
  title: "캐릭터 이름",
  text: "디즈니 캐릭터 {이름}을(를) 확인해보세요!",
  url: "/characters/{id}"
}
```

### Fallback

- Share API 미지원 시 자동으로 클립보드 복사
- 복사 완료 알림 표시

---

## 🎬 애니메이션 (Framer Motion)

### 적용된 애니메이션

#### 1. 페이지 로드

- **Hero 섹션**: 순차적 fade-in (0.6초)
- **통계 카드**: 스케일 + fade-in
- **별/반짝이**: 떠다니는 애니메이션

#### 2. 카드 애니메이션

- **진입**: opacity + translateY (stagger)
- **호버**: translateY(-5px)
- **버튼**: scale (1.1 on hover, 0.9 on tap)

#### 3. 페이지 전환

- **상세 페이지**: 각 섹션 순차 진입
- **비교 페이지**: 카드 추가/제거 애니메이션

### 성능 최적화

- `whileInView`: 뷰포트 진입 시만 애니메이션
- `viewport={{ once: true }}`: 한 번만 실행
- Stagger delay: `index * 0.05`

### 커스텀 애니메이션

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: Blue → Purple → Pink 그라데이션
- **다크모드**: Gray 900 → Purple 900 → Blue 900
- **Accent**: Yellow (즐겨찾기), Blue (비교)

### 컴포넌트

- `disney-card`: 카드 컨테이너
- `disney-btn-primary`: 메인 버튼
- `magic-text`: 그라데이션 텍스트
- `shimmer`: 로딩 스켈레톤

### 반응형 브레이크포인트

- **sm**: 640px (모바일)
- **md**: 768px (태블릿)
- **lg**: 1024px (데스크톱)
- **xl**: 1280px (와이드)

---

## 📊 상태 관리

### Zustand Stores

```typescript
1. useThemeStore
   - isDarkMode: boolean
   - toggleDarkMode()

2. useFavoritesStore
   - favorites: number[]
   - addFavorite(), removeFavorite(), toggleFavorite()

3. useCompareStore
   - compareList: number[] (max 3)
   - addToCompare(), removeFromCompare(), clearCompare()

4. useFilterStore
   - selectedFilm, selectedTvShow, selectedGame
   - searchQuery, currentPage
```

### React Query

```typescript
- useCharacters(): 캐릭터 목록
- useCharacter(id): 단일 캐릭터
- useSearchCharacters(query): 검색
- staleTime: 2~10분
- 자동 캐싱 및 재검증
```

---

## 🚀 성능 최적화

### 구현된 최적화

1. **이미지**: Next.js Image 컴포넌트
2. **캐싱**: React Query (5~10분)
3. **코드 스플리팅**: 자동 라우트 분할
4. **애니메이션**: GPU 가속 (transform)
5. **로컬 저장**: Zustand persist

### 측정 지표

- **FCP**: < 1.5초
- **LCP**: < 2.5초
- **TTI**: < 3.5초

---

## 🎯 사용 시나리오

### 시나리오 1: 좋아하는 캐릭터 찾기

1. 홈 → "캐릭터" 메뉴
2. 검색바에 이름 입력
3. 카드 클릭하여 상세 확인
4. ⭐ 버튼으로 즐겨찾기 추가

### 시나리오 2: 프린세스 비교

1. "영화" 필터에서 원하는 영화 선택
2. 3명의 프린세스 카드에서 ⚖️ 클릭
3. "비교" 메뉴로 이동
4. 출연작 개수 및 동료/적 비교

### 시나리오 3: 친구에게 공유

1. 좋아하는 캐릭터 상세 페이지
2. 📤 버튼 클릭
3. 카카오톡/메신저로 공유
4. 친구가 바로 확인

---

## 🔧 고급 기능

### 키보드 단축키

- 현재 미구현 (향후 추가 가능)

### 필터 조합

- 영화 + TV쇼 동시 선택 불가 (API 제한)
- 하나씩 선택하여 결과 확인

### 데이터 지속성

- 즐겨찾기: localStorage 영구 저장
- 다크모드: localStorage 영구 저장
- 비교 목록: 세션 중에만 유지
- 필터/검색: 세션 중에만 유지

---

💡 **Tip**: 모든 기능은 인터넷 연결 없이도 캐시된 데이터로 작동합니다!
