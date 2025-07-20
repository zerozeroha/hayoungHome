# hayoungHome

김하영의 **UI/Frontend 개발자 포트폴리오**
실제 실무 수준의 반응형 UI/UX, 컴포넌트 중심 개발, CSS 설계와 인터랙션, GSAP 기반 애니메이션 경험까지 담았습니다.

---

## ✨ 프로젝트 개요

- **웹 퍼블리싱 + UI 개발** 실무 능력 검증을 위한 개인 포트폴리오
- **HTML/CSS/JS 기반 SPA 스타일** + 반응형 + Canvas + 인터랙션 직접 구현
- **GSAP/ScrollTrigger** 등 외부 라이브러리 적용
- **Vite 기반 개발환경 구축**, API 키 보안 처리 적용
- 실제 기업 프로젝트 경험(핀테크, 데이터 시각화 등) 및 대표 프로젝트 요약

---

## 🚀 주요 기술 스택 및 구현 포인트

### 1. HTML5

- 시맨틱 마크업 및 접근성(Accessibility) 준수
- 섹션별 구조화, 네비게이션/모달/레이아웃 명확히 구분

### 2. CSS3 (모던 CSS UI + 반응형)

- **CSS 변수 시스템**으로 컬러/타이포/간격 관리
- 반응형 레이아웃 (Grid, Flexbox, Media Query)
- 재사용 가능한 공통 UI 컴포넌트 스타일 설계

### 3. JavaScript (Vanilla + 인터랙션 제어)

- **Canvas 파티클 애니메이션** 구현 (경계 충돌/리사이즈 대응)
- 타이핑 효과 / IntersectionObserver 스크롤 인터랙션
- **모달/네비/스크롤/리플/마우스 커서 등 다양한 UI 효과**
- **GSAP/ScrollTrigger**를 활용한 스크롤 기반 애니메이션
- **요청AnimationFrame**, setInterval 등 렌더링 최적화 고려

### 4. 외부 폰트 및 아이콘

- `Font Awesome CDN` 활용

### 5. Vite + 환경변수 관리

- Vite 개발환경 기반 구성 (`vite.config.js`)
- `.env` 파일을 통한 **공공 API 키 보호 (VITE_WEATHER_API_KEY)**
  → 키는 `import.meta.env.VITE_...`로 안전하게 불러옴

---

## API 연동

### 날씨 API (OpenWeatherMap)

- 도시별 실시간 날씨 정보를 가져오는 API 연동 구현
- API 호출은 `.env`를 통해 보안 처리됨:

```bash
VITE_WEATHER_API_KEY=your_api_key_here
```
