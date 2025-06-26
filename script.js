// Particle Animation
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.particles = []
    this.particleCount = 100

    this.resize()
    this.init()
    this.animate()

    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    this.particles = []
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas))
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.update()
      particle.draw(this.ctx)
    })

    this.drawConnections()

    requestAnimationFrame(() => this.animate())
  }

  drawConnections() {
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.ctx.save()
          this.ctx.globalAlpha = ((100 - distance) / 100) * 0.2
          this.ctx.strokeStyle = '#3b82f6'
          this.ctx.lineWidth = 1
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.stroke()
          this.ctx.restore()
        }
      })
    })
  }
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.size = Math.random() * 3 + 1
    this.opacity = Math.random() * 0.5 + 0.2
    this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

// Typing Animation
class TypingAnimation {
  constructor(element, text, speed = 50) {
    this.element = element
    this.text = text
    this.speed = speed
    this.index = 0

    this.start()
  }

  start() {
    const timer = setInterval(() => {
      if (this.index < this.text.length) {
        this.element.textContent = this.text.slice(0, this.index + 1)
        this.index++
      } else {
        clearInterval(timer)
      }
    }, this.speed)
  }
}

// Scroll Animation Observer
class ScrollAnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(entries => this.handleIntersection(entries), {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    })

    this.init()
  }

  init() {
    const elements = document.querySelectorAll('[data-aos]')
    elements.forEach(el => this.observer.observe(el))
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0
        setTimeout(() => {
          entry.target.classList.add('aos-animate')
        }, delay)
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Project Modal
class ProjectModal {
  constructor() {
    this.modal = document.getElementById('projectModal')
    this.closeBtn = document.querySelector('.modal-close')
    this.projectData = {
      wattsup: {
        title: 'WattsUp Dashboard',
        subtitle: '에너지 데이터 실시간 시각화 핀테크 플랫폼',
        description: '공공데이터 API와 Kakao Map API를 연동해 발전소 위치 및 정보를 시각적으로 제공하는 에너지 데이터 거래 대시보드입니다.',
        tech: ['Next.js', 'TypeScript', 'Recharts', 'Zustand', 'Framer Motion'],
        role: 'Front-End Developer',
        details: [
          '전체 페이지 UI 설계 및 반응형 퍼블리싱',
          '컴포넌트 기반 구조 설계',
          'Recharts, Zustand, Framer Motion 등으로 실시간 데이터 시각화 및 인터랙션 구현',
          'Next.js SSR 적용을 통한 SEO 개선 및 성능 최적화',
        ],
        github: 'https://github.com/zerozeroha/WattsUp',
      },
      surveygacha: {
        title: 'SurveyGacha',
        subtitle: '가챠 시스템이 적용된 설문조사 플랫폼',
        description: '설문 참여 시 가챠(보상)를 제공하는 웹 기반 리서치 서비스로, 사용자 몰입도를 높이며 효율적인 데이터 수집을 유도합니다.',
        tech: ['React', 'Zustand', 'Supabase', 'Figma'],
        role: 'Front-End Developer',
        details: [
          'Figma 디자인 기반 퍼블리싱',
          '모바일/PC 반응형 UI 구현',
          '설문 작성 및 응답 흐름 설계',
          'Zustand 상태관리 및 Supabase 연동을 통한 설문 데이터 처리 구현',
        ],
        github: 'https://github.com/zerozeroha/surveygacha',
      },
      carini: {
        title: 'CARINI Web',
        subtitle: '지도 기반 차량 탐색 플랫폼',
        description: '자동차 필터링, 지도 기반 추천, 비교 기능을 제공하는 차량 탐색 웹 플랫폼입니다.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Kakao Map API', 'Spring Boot'],
        role: 'Front-End Developer',
        details: [
          'HTML/CSS/JS 기반 퍼블리싱',
          'Kakao Map API 연동으로 지도 기반 시각화',
          'Spring Boot 백엔드와의 연동 작업',
          '차량 필터링 및 검색 기능 데이터 처리',
        ],
      },
      chatbot: {
        title: 'CARINI AI Chatbot',
        subtitle: 'AI 기반 차량 추천 챗봇',
        description: '차량 추천, 정보 탐색 기능을 제공하는 챗봇 기반 서비스로, 사용자의 대화 입력을 기반으로 필터링된 차량 정보를 제공합니다.',
        tech: ['Python', 'MySQL', 'Kakao Chatbot API'],
        role: 'Front-End & 데이터 설계 지원',
        details: [
          'MySQL 기반 차량 데이터베이스 설계',
          'Python 기반 챗봇 대화 흐름 구성',
          '카카오 챗봇 API 연동 및 사용자 입력 처리 로직 설계',
        ],
      },
    }

    this.init()
  }

  init() {
    document.querySelectorAll('.project-card').forEach((card) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      card.addEventListener('click', (e) => {
        const projectId = card.dataset.project
        this.openModal(projectId)
      })
    })

    this.closeBtn.addEventListener('click', () => this.closeModal())
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') {
        this.closeModal()
      }
    })
  }

  openModal(projectId) {
    const project = this.projectData[projectId]
    if (!project) return

    document.getElementById('modalTitle').textContent = project.title
    document.getElementById('modalSubtitle').textContent = project.subtitle
    document.getElementById('modalDescription').textContent = project.description
    document.getElementById('modalRole').textContent = project.role

    const techContainer = document.getElementById('modalTech')
    techContainer.innerHTML = ''
    project.tech.forEach((tech) => {
      const span = document.createElement('span')
      span.className = 'tech-tag'
      span.textContent = tech
      techContainer.appendChild(span)
    })

    const detailsList = document.getElementById('modalDetails')
    detailsList.innerHTML = ''
    project.details.forEach((detail) => {
      const li = document.createElement('li')
      li.textContent = detail
      detailsList.appendChild(li)
    })

    const githubBtn = document.getElementById('modalGithub')
    if (project.github) {
      githubBtn.href = project.github
      githubBtn.style.display = 'inline-flex'
    } else {
      githubBtn.style.display = 'none'
    }

    this.modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }

  closeModal() {
    this.modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

// Mobile Navigation
class MobileNavigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger')
    this.navMenu = document.querySelector('.nav-menu')
    this.navLinks = document.querySelectorAll('.nav-link')

    this.init()
  }

  init() {
    this.hamburger.addEventListener('click', () => this.toggleMenu())
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu())
    })
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active')
    this.navMenu.classList.toggle('active')
  }

  closeMenu() {
    this.hamburger.classList.remove('active')
    this.navMenu.classList.remove('active')
  }
}

// Smooth Scroll for Navigation Links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href'))
        if (target) {
          const offsetTop = target.offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          })
        }
      })
    })
  }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
  constructor() {
    this.navbar = document.querySelector('.navbar')
    this.init()
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.style.background = 'rgba(15, 23, 42, 0.95)'
        this.navbar.style.backdropFilter = 'blur(20px)'
      } else {
        this.navbar.style.background = 'rgba(15, 23, 42, 0.9)'
        this.navbar.style.backdropFilter = 'blur(10px)'
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas')
  new ParticleSystem(canvas)

  const typingElement = document.getElementById('typingText')
  const typingText = '핀테크 실무 퍼블리싱 경험을 바탕으로 사용자 흐름을 고려한 UI 구조와 컴포넌트 중심 개발에 강점을 가지고 있습니다.'
  new TypingAnimation(typingElement, typingText)

  new ScrollAnimationObserver()
  new ProjectModal()
  new MobileNavigation()
  new SmoothScroll()
  new NavbarScrollEffect()
})

function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

document.addEventListener(
  'mousemove',
  throttle((e) => {
    const cursor = document.querySelector('.cursor-dot')
    if (cursor) {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }
  }, 16)
)
