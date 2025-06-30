// ===================================
// 파티클 애니메이션 시스템
// ===================================

// 전역 변수 선언
let canvas, // 캔버스 요소
  ctx, // 캔버스 컨텍스트
  particles = [] // 파티클 배열

// 파티클 시스템 초기화 함수
function initParticles() {
  // DOM에서 캔버스 요소 가져오기
  canvas = document.getElementById("particleCanvas")
  ctx = canvas.getContext("2d")

  // 초기 설정 및 애니메이션 시작
  resizeCanvas()
  createParticles()
  animateParticles()

  // 윈도우 리사이즈 이벤트 리스너 등록
  window.addEventListener("resize", resizeCanvas)
}

// 캔버스 크기를 윈도우 크기에 맞게 조정
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

// 파티클 생성 함수
function createParticles() {
  particles = [] // 기존 파티클 배열 초기화

  // 50개의 파티클 생성
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width, // 랜덤 X 위치
      y: Math.random() * canvas.height, // 랜덤 Y 위치
      vx: (Math.random() - 0.5) * 0.3, // X축 속도 (-0.15 ~ 0.15)
      vy: (Math.random() - 0.5) * 0.3, // Y축 속도 (-0.15 ~ 0.15)
      size: Math.random() * 2 + 1, // 크기 (1 ~ 3)
      opacity: Math.random() * 0.3 + 0.1, // 투명도 (0.1 ~ 0.4)
    })
  }
}

// 파티클 애니메이션 루프
function animateParticles() {
  // 캔버스 전체 지우기
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 각 파티클 업데이트 및 그리기
  particles.forEach((particle) => {
    // 파티클 위치 업데이트
    particle.x += particle.vx
    particle.y += particle.vy

    // 경계 충돌 처리 (벽에 닿으면 반대 방향으로)
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

    // 파티클 그리기
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = "#dc2626" // 빨간색
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  // 파티클 간 연결선 그리기
  drawConnections()

  // 다음 프레임 요청
  // 다음 리페인트(화면을 다시 그리는 작업) 시점에 지정한 콜백 함수를 실행해달라고 요청하는 비동기 API
  requestAnimationFrame(animateParticles)
}

// 파티클 간 연결선 그리기 함수
function drawConnections() {
  particles.forEach((particle, i) => {
    // 현재 파티클 이후의 파티클들과만 연결 (중복 방지)
    particles.slice(i + 1).forEach((other) => {
      // 두 파티클 간 거리 계산
      const dx = particle.x - other.x
      const dy = particle.y - other.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // 거리가 120px 이하일 때만 연결선 그리기
      if (distance < 120) {
        ctx.save()
        // 거리에 따른 투명도 조절 (가까울수록 진함)
        ctx.globalAlpha = ((120 - distance) / 120) * 0.15
        ctx.strokeStyle = "#dc2626"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(other.x, other.y)
        ctx.stroke()
        ctx.restore()
      }
    })
  })
}

// ===================================
// 타이핑 애니메이션
// ===================================

// 타이핑 애니메이션 시작 함수
function startTyping() {
  const element = document.getElementById("typingText")
  const text =
    "핀테크 실무 퍼블리싱 경험을 바탕으로 사용자 흐름을 고려한 UI 구조와 컴포넌트 중심 개발에 강점을 가지고 있습니다."
  let index = 0 // 현재 타이핑 위치

  // 80ms마다 한 글자씩 추가
  const timer = setInterval(() => {
    if (index < text.length) {
      element.textContent = text.slice(0, index + 1)
      index++
    } else {
      clearInterval(timer) // 타이핑 완료 시 타이머 정리
    }
  }, 90)
}

// ===================================
// 스크롤 애니메이션 (AOS - Animate On Scroll)
// ===================================

// 스크롤 애니메이션 초기화 함수
function initScrollAnimation() {
  // Intersection Observer 생성
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 요소가 화면에 보일 때
        if (entry.isIntersecting) {
          // 지연 시간 가져오기 (data-aos-delay 속성)
          const delay = entry.target.dataset.aosDelay || 0

          // 지연 시간 후 애니메이션 클래스 추가
          setTimeout(() => {
            entry.target.classList.add("aos-animate")
          }, delay)

          // 한 번 애니메이션된 요소는 관찰 중단
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1, // 10% 보일 때 트리거
      rootMargin: "0px 0px -50px 0px", // 하단 50px 마진
    },
  )

  // data-aos 속성을 가진 모든 요소 관찰 시작
  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el)
  })
}

// ===================================
// 프로젝트 모달 시스템
// ===================================

// 프로젝트 데이터 객체
const projectData = {
  wattsup: {
    title: "WattsUp Dashboard",
    subtitle: "에너지 데이터 실시간 시각화 핀테크 플랫폼",
    description: "공공데이터 API와 Kakao Map API를 연동해 발전소 위치 및 정보를 시각적으로 제공하는 에너지 데이터 거래 대시보드입니다.",
    tech: ["Next.js", "TypeScript", "Recharts", "Zustand", "Framer Motion"],
    role: "Front-End Developer",
    details: [
      "전체 페이지 UI 설계 및 반응형 퍼블리싱",
      "컴포넌트 기반 구조 설계",
      "Recharts, Zustand, Framer Motion 등으로 실시간 데이터 시각화 및 인터랙션 구현",
      "Next.js SSR 적용을 통한 SEO 개선 및 성능 최적화",
    ],
    github: "https://github.com/zerozeroha/WattsUp",
  },
  surveygacha: {
    title: "SurveyGacha",
    subtitle: "가챠 시스템이 적용된 설문조사 플랫폼",
    description: "설문 참여 시 가챠(보상)를 제공하는 웹 기반 리서치 서비스로, 사용자 몰입도를 높이며 효율적인 데이터 수집을 유도합니다.",
    tech: ["React", "Zustand", "Supabase", "Figma"],
    role: "Front-End Developer",
    details: [
      "Figma 디자인 기반 퍼블리싱",
      "모바일/PC 반응형 UI 구현",
      "설문 작성 및 응답 흐름 설계",
      "Zustand 상태관리 및 Supabase 연동을 통한 설문 데이터 처리 구현",
    ],
    github: "https://github.com/zerozeroha/surveygacha",
  },
  carini: {
    title: "CARINI Web",
    subtitle: "지도 기반 차량 탐색 플랫폼",
    description: "자동차 필터링, 지도 기반 추천, 비교 기능을 제공하는 차량 탐색 웹 플랫폼입니다.",
    tech: ["HTML", "CSS", "JavaScript", "Kakao Map API", "Spring Boot"],
    role: "Front-End Developer",
    details: [
      "HTML/CSS/JS 기반 퍼블리싱",
      "Kakao Map API 연동으로 지도 기반 시각화",
      "Spring Boot 백엔드와의 연동 작업",
      "차량 필터링 및 검색 기능 데이터 처리",
    ],
  },
  chatbot: {
    title: "CARINI AI Chatbot",
    subtitle: "AI 기반 차량 추천 챗봇",
    description: "차량 추천, 정보 탐색 기능을 제공하는 챗봇 기반 서비스로, 사용자의 대화 입력을 기반으로 필터링된 차량 정보를 제공합니다.",
    tech: ["Python", "MySQL", "Kakao Chatbot API"],
    role: "Front-End & 데이터 설계 지원",
    details: [
      "MySQL 기반 차량 데이터베이스 설계",
      "Python 기반 챗봇 대화 흐름 구성",
      "카카오 챗봇 API 연동 및 사용자 입력 처리 로직 설계",
    ],
  },
}

// 모달 초기화 함수
function initModal() {
  const modal = document.getElementById("projectModal")
  const closeBtn = document.querySelector(".modal-close")

  // 프로젝트 카드 클릭 이벤트 등록
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.dataset.project // data-project 속성 값 가져오기
      openModal(projectId)
    })
  })

  // 모달 닫기 이벤트들
  closeBtn.addEventListener("click", closeModal)

  // 모달 배경 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  })
}

// 모달 열기 함수
function openModal(projectId) {
  const project = projectData[projectId]
  if (!project) return // 프로젝트 데이터가 없으면 종료

  const modal = document.getElementById("projectModal")

  // 모달 내용 업데이트
  document.getElementById("modalTitle").textContent = project.title
  document.getElementById("modalSubtitle").textContent = project.subtitle
  document.getElementById("modalDescription").textContent = project.description
  document.getElementById("modalRole").textContent = project.role

  // 기술 스택 태그 생성
  const techContainer = document.getElementById("modalTech")
  techContainer.innerHTML = "" // 기존 내용 제거
  project.tech.forEach((tech) => {
    const span = document.createElement("span")
    span.textContent = tech
    techContainer.appendChild(span)
  })

  // 상세 내용 리스트 생성
  const detailsList = document.getElementById("modalDetails")
  detailsList.innerHTML = "" // 기존 내용 제거
  project.details.forEach((detail) => {
    const li = document.createElement("li")
    li.textContent = detail
    detailsList.appendChild(li)
  })

  // GitHub 링크 설정
  const githubBtn = document.getElementById("modalGithub")
  if (project.github) {
    githubBtn.href = project.github
    githubBtn.style.display = "inline-flex"
  } else {
    githubBtn.style.display = "none" // GitHub 링크가 없으면 숨김
  }

  // 모달 표시 및 스크롤 방지
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById("projectModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto" // 스크롤 복원
}

// ===================================
// 모바일 네비게이션
// ===================================

// 모바일 네비게이션 초기화 함수
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // 햄버거 메뉴 클릭 이벤트
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // 네비게이션 링크 클릭 시 메뉴 닫기
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// ===================================
// 부드러운 스크롤
// ===================================

// 부드러운 스크롤 초기화 함수
function initSmoothScroll() {
  // 앵커 링크(#으로 시작하는 링크)에 부드러운 스크롤 적용
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault() // 기본 앵커 동작 방지

      const target = document.querySelector(anchor.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // 네비바 높이만큼 오프셋
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth", // 부드러운 스크롤
        })
      }
    })
  })
}

// ===================================
// 네비바 스크롤 효과
// ===================================

// 네비바 스크롤 효과 초기화 함수
function initNavbarEffect() {
  const navbar = document.querySelector(".navbar")

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      // 스크롤이 100px 이상일 때 배경 진하게
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      // 상단에 있을 때 기본 배경
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
}

// ===================================
// 메인 초기화 함수
// ===================================

// DOM 로드 완료 시 모든 기능 초기화
document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded : HTML 문서의 기본 구조(문서 객체)가 모두 로드되었을 때 실행되는 이벤트
  initParticles() // 파티클 애니메이션 시작
  startTyping() // 타이핑 애니메이션 시작
  initScrollAnimation() // 스크롤 애니메이션 초기화
  initModal() // 모달 시스템 초기화
  initMobileNav() // 모바일 네비게이션 초기화
  initSmoothScroll() // 부드러운 스크롤 초기화
  initNavbarEffect() // 네비바 효과 초기화
})
