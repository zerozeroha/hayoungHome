// ===================================
// 안전한 로딩 및 초기화 시스템
// ===================================

// 전역 변수
let canvas,
  ctx,
  particles = []

// 1. 로딩 스크린 숨김 함수 (GSAP 없으면 바로 display none)
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    if (window.gsap && typeof window.gsap.to === "function") {
      window.gsap.to(loadingScreen, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          loadingScreen.style.display = "none"
        },
      })
    } else {
      // GSAP이 로드 안 됐어도 안전하게!
      loadingScreen.style.opacity = "0"
      loadingScreen.style.display = "none"
    }
  }
}

// 2. 모든 초기화 (실패해도 로딩 무조건 숨기기)
function initializeApp() {
  try {
    console.log("앱 초기화 시작...")

    // GSAP 플러그인 등록 (있으면)
    if (window.gsap && window.ScrollTrigger && window.TextPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.TextPlugin)
      console.log("GSAP 플러그인 등록 완료")
    }

    // 각 초기화 함수들을 안전하게 실행
    safeInit(initParticles, "파티클 시스템")
    safeInit(initCustomCursor, "커스텀 커서")
    safeInit(initGSAPAnimations, "GSAP 애니메이션")
    safeInit(initTypingAnimation, "타이핑 애니메이션")
    safeInit(initAOSAnimations, "AOS 애니메이션")
    safeInit(initMobileNav, "모바일 네비게이션")
    safeInit(initModal, "모달 시스템")
    safeInit(initSmoothScroll, "부드러운 스크롤")
    safeInit(initNavbarEffect, "네비바 효과")
    safeInit(initRealTimeData, "실시간 데이터")
    safeInit(initSkillProgress, "스킬 프로그레스")
    safeInit(initCounterAnimation, "카운터 애니메이션")
    safeInit(initButtonEffects, "버튼 효과")

    // API 데이터 로드
    safeInit(loadAllAPIData, "API 데이터")

    console.log("앱 초기화 완료!")
  } catch (err) {
    console.error("초기화 중 오류:", err)
  }
}

// 3. 안전한 초기화 헬퍼 함수
function safeInit(func, name) {
  try {
    func()
    console.log(`${name} 초기화 완료`)
  } catch (err) {
    console.error(`${name} 초기화 실패:`, err)
  }
}

// 4. DOMContentLoaded에서 모든 작업을 안전하게 처리
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로드 완료")

  // 로딩 스크린 반드시 2초 이내 사라지도록
  setTimeout(() => {
    try {
      initializeApp()
    } finally {
      hideLoadingScreen() // 무조건 로딩 숨김
    }
  }, 2000)
})

// ===================================
// 파티클 애니메이션 시스템
// ===================================

function initParticles() {
  canvas = document.getElementById("particleCanvas")
  if (!canvas) return

  ctx = canvas.getContext("2d")
  resizeCanvas()
  createParticles()
  animateParticles()
  window.addEventListener("resize", resizeCanvas)
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function createParticles() {
  particles = []
  const particleCount = window.innerWidth < 768 ? 30 : 50

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 60 + 340}, 70%, 60%)`,
    })
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle, i) => {
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    particles.slice(i + 1).forEach((other) => {
      const dx = particle.x - other.x
      const dy = particle.y - other.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        ctx.save()
        ctx.globalAlpha = ((150 - distance) / 150) * 0.2
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(other.x, other.y)
        ctx.stroke()
        ctx.restore()
      }
    })
  })

  requestAnimationFrame(animateParticles)
}

// ===================================
// 커스텀 커서 시스템
// ===================================

function initCustomCursor() {
  const cursor = document.getElementById("cursor")
  const follower = document.getElementById("cursor-follower")

  if (!cursor || !follower) return

  let mouseX = 0,
    mouseY = 0
  let followerX = 0,
    followerY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    if (window.gsap) {
      window.gsap.to(cursor, {
        duration: 0,
        x: mouseX - 10,
        y: mouseY - 10,
      })
    }
  })

  function updateFollower() {
    followerX += (mouseX - followerX) * 0.1
    followerY += (mouseY - followerY) * 0.1

    if (window.gsap) {
      window.gsap.set(follower, {
        x: followerX - 20,
        y: followerY - 20,
      })
    }

    requestAnimationFrame(updateFollower)
  }
  updateFollower()

  const hoverElements = document.querySelectorAll("a, button, .btn, .project-card, .skill-card")
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      if (window.gsap) {
        window.gsap.to(cursor, {
          duration: 0.3,
          scale: 1.5
        })
        window.gsap.to(follower, {
          duration: 0.3,
          scale: 1.5
        })
      }
    })

    element.addEventListener("mouseleave", () => {
      if (window.gsap) {
        window.gsap.to(cursor, {
          duration: 0.3,
          scale: 1
        })
        window.gsap.to(follower, {
          duration: 0.3,
          scale: 1
        })
      }
    })
  })
}

// ===================================
// GSAP 애니메이션 시스템
// ===================================

function initGSAPAnimations() {
  if (!window.gsap) return

  // 네비게이션 애니메이션
  window.gsap.from(".nav-logo", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "bounce.out",
  })

  window.gsap.from(".nav-link", {
    duration: 0.8,
    y: -30,
    opacity: 0,
    stagger: 0.1,
    delay: 0.5,
    ease: "power2.out",
  })

  // 히어로 섹션 애니메이션
  const heroTl = window.gsap.timeline({
    delay: 0.5
  })

  heroTl
    .from(".hero-label", {
      duration: 0.8,
      y: 30,
      opacity: 0
    })
    .from(".title-main", {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(".title-sub", {
      duration: 0.8,
      y: 20,
      opacity: 0
    }, "-=0.5")
    .from(".hero-widgets .widget", {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1
    }, "-=0.3")
    .from(".stat-item", {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(".btn", {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1
    }, "-=0.3")

  // 배경 도형 애니메이션
  window.gsap.to(".shape-1", {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: "none",
  })

  window.gsap.to(".shape-2", {
    duration: 15,
    rotation: -360,
    repeat: -1,
    ease: "none",
  })

  window.gsap.to(".shape-3", {
    duration: 25,
    rotation: 360,
    repeat: -1,
    ease: "none",
  })

  initScrollTriggerAnimations()
}

function initScrollTriggerAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return

  // 스킬 카드 애니메이션
  window.gsap.utils.toArray(".skill-card").forEach((card, i) => {
    window.gsap.fromTo(
      card, {
        opacity: 0,
        y: 50,
        rotationY: -90
      }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // 프로젝트 카드 애니메이션
  window.gsap.utils.toArray(".project-card").forEach((card, i) => {
    window.gsap.fromTo(
      card, {
        opacity: 0,
        scale: 0.8,
        rotationX: -45
      }, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// ===================================
// 타이핑 애니메이션
// ===================================

function initTypingAnimation() {
  const typingElement = document.getElementById("typing-text")
  if (!typingElement) return

  const texts = [
    "사용자 중심 UI를 설계하고 개발하는 Frontend 개발자입니다.",
    "핀테크 실무 경험을 바탕으로 사용자 흐름을 고려한 UI 구조와 컴포넌트 중심 개발에 강점을 가지고 있습니다.",
    "React, Next.js, TypeScript를 활용한 현대적인 웹 애플리케이션 개발을 전문으로 합니다.",
  ]

  let currentTextIndex = 0

  function typeText() {
    const currentText = texts[currentTextIndex]

    if (window.gsap && window.TextPlugin) {
      window.gsap.to(typingElement, {
        duration: currentText.length * 0.05,
        text: currentText,
        ease: "none",
        onComplete: () => {
          setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % texts.length
            window.gsap.to(typingElement, {
              duration: 0.5,
              text: "",
              ease: "none",
              onComplete: typeText,
            })
          }, 3000)
        },
      })
    } else {
      // GSAP TextPlugin이 없으면 간단한 타이핑 효과
      let i = 0
      typingElement.textContent = ""
      const timer = setInterval(() => {
        typingElement.textContent += currentText[i]
        i++
        if (i >= currentText.length) {
          clearInterval(timer)
          setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % texts.length
            typeText()
          }, 3000)
        }
      }, 50)
    }
  }

  setTimeout(typeText, 2000)
}

// ===================================
// AOS 스크롤 애니메이션
// ===================================

function initAOSAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay || 0
          setTimeout(() => {
            entry.target.classList.add("aos-animate")
          }, delay)
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    },
  )

  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el)
  })
}

// ===================================
// 모바일 네비게이션
// ===================================

function initMobileNav() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  if (!hamburger || !navMenu) return

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// ===================================
// 모달 시스템
// ===================================

const projectData = {
  wattsup: {
    title: "WattsUp Dashboard",
    subtitle: "에너지 데이터 실시간 시각화 핀테크 플랫폼",
    description: "TurbinCrew와 협력하여 에너지 데이터를 시각화하고 거래할 수 있는 웹 서비스입니다.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Framer Motion", "Zustand"],
    role: "Front-End Developer",
    details: [
      "웹 전체 Design - Shadcn/ui 및 Tailwind CSS를 활용한 디자인 시스템 구축",
      "UI/UX 퍼블리싱 - 반응형 Tablet, PC 대응",
      "메인/전력거래/소개페이지 컴포넌트 설계",
      "공공데이터 API 연동 및 Recharts를 활용한 데이터 시각화",
    ],
    github: "https://github.com/zerozeroha/WattsUp",
  },
  surveygacha: {
    title: "SurveyGacha",
    subtitle: "가챠 시스템이 적용된 설문조사 플랫폼",
    description: "기존 ReviewGacha 프로젝트를 개선하여 사용자 경험을 최적화한 설문 조사 기반 웹 애플리케이션입니다.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Zustand", "Supabase"],
    role: "Front-End Developer",
    details: [
      "디자이너와 협업하여 Figma 디자인 기반 UI 구현",
      "반응형 Mobile, PC UI/UX 퍼블리싱",
      "설문조사 페이지 컴포넌트 설계",
      "Zustand를 활용한 상태관리 최적화",
    ],
    github: "https://github.com/zerozeroha/surveygacha",
  },
  carini: {
    title: "CARINI Web",
    subtitle: "지도 기반 차량 탐색 플랫폼",
    description: "사용자가 원하는 차량을 쉽고 직관적으로 탐색할 수 있는 웹 서비스입니다.",
    tech: ["HTML", "CSS", "JavaScript", "Spring Boot", "MySQL", "Kakao Map API"],
    role: "Front-End Developer",
    details: [
      "CSS 및 HTML을 활용한 UI/UX 디자인 설계",
      "JavaScript 기반 동적 UI 및 사용자 인터랙션 구현",
      "Kakao 지도 API를 활용한 차량 매물 정보 시각화",
    ],
    github: "https://github.com/zerozeroha/CARINI_PROJECT",
  },
  chatbot: {
    title: "CARINI AI Chatbot",
    subtitle: "AI 기반 차량 추천 챗봇",
    description: "카카오 챗봇 API를 활용한 맞춤형 AI 챗봇 서비스입니다.",
    tech: ["Python", "MySQL", "Kakao Chatbot API", "Jupyter Notebook"],
    role: "Development",
    details: [
      "MySQL을 활용한 자동차 데이터 테이블 구성 및 최적화",
      "사용자 입력 기반 맞춤형 자동차 추천 시스템 개발",
      "카카오 챗봇 API 연동 및 블록 기반 대화 흐름 설계",
    ],
  },
}

function initModal() {
  const modal = document.getElementById("projectModal")
  const closeBtn = document.querySelector(".modal-close")

  if (!modal || !closeBtn) return

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.dataset.project
      openModal(projectId)
    })
  })

  closeBtn.addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  })
}

function openModal(projectId) {
  const project = projectData[projectId]
  if (!project) return

  const modal = document.getElementById("projectModal")

  document.getElementById("modalTitle").textContent = project.title
  document.getElementById("modalSubtitle").textContent = project.subtitle
  document.getElementById("modalDescription").textContent = project.description
  document.getElementById("modalRole").textContent = project.role

  const techContainer = document.getElementById("modalTech")
  techContainer.innerHTML = ""
  project.tech.forEach((tech) => {
    const span = document.createElement("span")
    span.textContent = tech
    techContainer.appendChild(span)
  })

  const detailsList = document.getElementById("modalDetails")
  detailsList.innerHTML = ""
  project.details.forEach((detail) => {
    const li = document.createElement("li")
    li.textContent = detail
    detailsList.appendChild(li)
  })

  const githubBtn = document.getElementById("modalGithub")
  if (project.github) {
    githubBtn.href = project.github
    githubBtn.style.display = "inline-flex"
  } else {
    githubBtn.style.display = "none"
  }

  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  if (window.gsap) {
    window.gsap.fromTo(modal, {
      opacity: 0
    }, {
      duration: 0.3,
      opacity: 1
    })
    window.gsap.fromTo(
      ".modal-content", {
        scale: 0.8,
        y: 50
      }, {
        duration: 0.3,
        scale: 1,
        y: 0,
        ease: "back.out(1.7)"
      },
    )
  }
}

function closeModal() {
  const modal = document.getElementById("projectModal")

  if (window.gsap) {
    window.gsap.to(modal, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      },
    })
  } else {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// ===================================
// 부드러운 스크롤
// ===================================

function initSmoothScroll() {
  document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80
        if (window.gsap) {
          window.gsap.to(window, {
            duration: 1,
            scrollTo: offsetTop,
            ease: "power2.inOut",
          })
        } else {
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
}

// ===================================
// 네비바 스크롤 효과
// ===================================

function initNavbarEffect() {
  const navbar = document.querySelector(".navbar")
  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
}

// ===================================
// 실시간 데이터 시스템
// ===================================

function initRealTimeData() {
  updateCurrentTime()
  updateVisitorCount()
  loadWeatherWidget()

  setInterval(updateCurrentTime, 1000)
  setInterval(updateVisitorCount, 10000)
  setInterval(loadWeatherWidget, 600000)
}

function updateCurrentTime() {
  const timeElement = document.getElementById("current-time")
  if (!timeElement) return

  const now = new Date()
  const timeString = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  timeElement.textContent = timeString
}

function updateVisitorCount() {
  const visitorElement = document.getElementById("visitor-count")
  if (!visitorElement) return

  let count = localStorage.getItem("visitorCount") || 0
  count = Number.parseInt(count) + Math.floor(Math.random() * 3) + 1
  localStorage.setItem("visitorCount", count)

  if (window.gsap) {
    window.gsap.to(visitorElement, {
      duration: 0.5,
      scale: 1.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        visitorElement.textContent = count.toLocaleString()
      },
    })
  } else {
    visitorElement.textContent = count.toLocaleString()
  }
}

function loadWeatherWidget() {
  const weatherElement = document.getElementById("weather-data")
  if (!weatherElement) return

  const mockWeather = {
    temp: Math.floor(Math.random() * 20) + 5,
    condition: ["맑음", "흐림", "비", "눈"][Math.floor(Math.random() * 4)],
  }

  weatherElement.textContent = `${mockWeather.temp}°C ${mockWeather.condition}`
}

// ===================================
// 스킬 프로그레스 바 애니메이션
// ===================================

function initSkillProgress() {
  const progressBars = document.querySelectorAll(".progress-bar")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const progress = progressBar.dataset.progress

          if (window.gsap) {
            window.gsap.to(progressBar, {
              duration: 2,
              width: `${progress}%`,
              ease: "power2.out",
              delay: 0.5,
            })
          } else {
            setTimeout(() => {
              progressBar.style.width = `${progress}%`
            }, 500)
          }

          observer.unobserve(progressBar)
        }
      })
    }, {
      threshold: 0.5
    },
  )

  progressBars.forEach((bar) => observer.observe(bar))
}

// ===================================
// 카운터 애니메이션
// ===================================

function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number[data-count]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.dataset.count)

          if (window.gsap) {
            window.gsap.fromTo(
              counter, {
                textContent: 0
              }, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: {
                  textContent: 1
                },
                onUpdate: function () {
                  const value = Math.ceil(this.targets()[0].textContent)
                  counter.textContent = target === 100 ? `${value}%` : `${value}+`
                },
              },
            )
          } else {
            // GSAP 없이 간단한 카운터
            let current = 0
            const increment = target / 100
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              counter.textContent = target === 100 ? `${Math.ceil(current)}%` : `${Math.ceil(current)}+`
            }, 20)
          }

          observer.unobserve(counter)
        }
      })
    }, {
      threshold: 0.5
    },
  )

  counters.forEach((counter) => observer.observe(counter))
}

// ===================================
// 버튼 효과
// ===================================

function initButtonEffects() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (window.gsap) {
        window.gsap.to(btn, {
          duration: 0.3,
          scale: 1.05,
          ease: "power2.out",
        })
      }
    })

    btn.addEventListener("mouseleave", () => {
      if (window.gsap) {
        window.gsap.to(btn, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        })
      }
    })
  })
}

// ===================================
// API 데이터 로딩 시스템
// ===================================

async function loadAllAPIData() {
  try {
    await Promise.all([loadDustData(), loadWeatherData(), loadNewsData(), ])
  } catch (error) {
    console.error("API 데이터 로딩 중 오류:", error)
  }
}

async function loadDustData() {
  try {
    showLoading("dust")

    // Mock 데이터로 대체 (CORS 문제 방지)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockData = {
      stationName: "종로구",
      pm10Value: Math.floor(Math.random() * 100) + 20,
      pm25Value: Math.floor(Math.random() * 50) + 10,
      dataTime: new Date().toLocaleString("ko-KR"),
    }

    bindDustData(mockData)
    showData("dust")
  } catch (error) {
    console.error("미세먼지 데이터 로딩 실패:", error)
    showError("dust")
  }
}

function bindDustData(data) {
  document.getElementById("dust-station").textContent = data.stationName || "-"
  document.getElementById("dust-pm10").textContent = data.pm10Value ? `${data.pm10Value} ㎍/㎥` : "-"
  document.getElementById("dust-pm25").textContent = data.pm25Value ? `${data.pm25Value} ㎍/㎥` : "-"
  document.getElementById("dust-time").textContent = data.dataTime || "-"

  if (window.gsap) {
    window.gsap.from("#dust-data .data-item", {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    })
  }
}

async function loadWeatherData() {
  try {
    showLoading("weather")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockData = {
      name: "서울",
      main: {
        temp: Math.floor(Math.random() * 25) + 5,
        humidity: Math.floor(Math.random() * 40) + 40,
      },
      weather: [{
        main: "Clear",
        description: "맑음",
        icon: "01d"
      }],
      wind: {
        speed: (Math.random() * 8 + 2).toFixed(1)
      },
    }

    bindWeatherData(mockData)
    showData("weather")
  } catch (error) {
    console.error("날씨 데이터 로딩 실패:", error)
    showError("weather")
  }
}

function bindWeatherData(data) {
  const iconMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️"
  }

  document.getElementById("weather-icon").textContent = iconMap[data.weather[0].main] || "🌤️"
  document.getElementById("weather-temp").textContent = `${Math.round(data.main.temp)}°C`
  document.getElementById("weather-city").textContent = data.name
  document.getElementById("weather-humidity").textContent = `${data.main.humidity}%`
  document.getElementById("weather-wind").textContent = `${data.wind.speed} m/s`
}

async function loadNewsData() {
  try {
    showLoading("news")
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockNews = [{
        title: "프론트엔드 개발 트렌드 2025",
        publishedAt: new Date().toISOString()
      },
      {
        title: "React 19 새로운 기능 소개",
        publishedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        title: "TypeScript 5.0 업데이트",
        publishedAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        title: "Next.js 15 성능 개선사항",
        publishedAt: new Date(Date.now() - 10800000).toISOString()
      },
    ]

    bindNewsData(mockNews)
    showData("news")
  } catch (error) {
    console.error("뉴스 데이터 로딩 실패:", error)
    showError("news")
  }
}

function bindNewsData(articles) {
  const newsList = document.getElementById("news-list")
  newsList.innerHTML = ""

  articles.forEach((article) => {
    const newsItem = document.createElement("div")
    newsItem.className = "news-item"

    const publishedDate = new Date(article.publishedAt).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    newsItem.innerHTML = `
      <div class="news-title">${article.title}</div>
      <div class="news-date">${publishedDate}</div>
    `

    newsList.appendChild(newsItem)
  })

  if (window.gsap) {
    window.gsap.from(".news-item", {
      duration: 0.6,
      x: -30,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    })
  }
}



function showLoading(section) {
  document.getElementById(`${section}-loading`).style.display = "flex"
  document.getElementById(`${section}-data`).style.display = "none"
  if (document.getElementById(`${section}-error`)) {
    document.getElementById(`${section}-error`).style.display = "none"
  }
}

function showData(section) {
  document.getElementById(`${section}-loading`).style.display = "none"
  document.getElementById(`${section}-data`).style.display = "block"
  if (document.getElementById(`${section}-error`)) {
    document.getElementById(`${section}-error`).style.display = "none"
  }
}

function showError(section) {
  document.getElementById(`${section}-loading`).style.display = "none"
  document.getElementById(`${section}-data`).style.display = "none"
  if (document.getElementById(`${section}-error`)) {
    document.getElementById(`${section}-error`).style.display = "block"
  }
}

// ===================================
// 전역 에러 처리
// ===================================

window.addEventListener("error", (e) => {
  console.error("JavaScript 오류:", e.error)
})

window.addEventListener("load", () => {
  console.log("모든 리소스 로딩 완료")
})

// GSAP 로딩 확인
if (typeof window.gsap === "undefined") {
  console.warn("GSAP 라이브러리가 로드되지 않았습니다. 기본 애니메이션으로 대체됩니다.")
} else {
  console.log("GSAP 라이브러리 로드 완료")
}
