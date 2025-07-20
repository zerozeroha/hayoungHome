// 페이지 로드 완료 시 초기화
window.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 포트폴리오 시작!');

  // 기능들 초기화
  initCanvas();
  initCursor();
  initTyping();
  initTime();
  initWeather();
  initMobileMenu();
  initSmoothScroll();
  initAnimations();
  initParticleToggler();
});

/**
 * Canvas 파티클 효과
 */
function initCanvas() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const particles = [];
  let particleCount = 50;

  // 캔버스 크기 설정
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // 파티클 생성
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });
  }

  // 파티클 그리기
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      // 파티클 이동
      p.x += p.speedX;
      p.y += p.speedY;

      // 경계에서 반튕
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      // 파티클 그리기
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(184, 133, 133, 0.5)';
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/**
 * 커스텀 커서
 */
function initCursor() {
  const cursor = document.querySelector('.cursor');

  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

/**
 * 타이핑 효과
 */
function initTyping() {
  const texts = [
    '사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다.',
    '탄탄한 HTML CSS JAVASCRIPT 코딩',
    'React와 Next.js로 인터랙티브한 웹을 만듭니다.',
    'GSAP와 Canvas로 역동적인 UI를 구현합니다.'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const pauseTime = 2000;
  const typingElement = document.getElementById('typing-text');

  function type() {
    const currentText = texts[textIndex];
    let displayText = isDeleting ?
      currentText.substring(0, charIndex--) :
      currentText.substring(0, charIndex++);

    typingElement.textContent = displayText;

    // 타이핑 완료 시 일시정지 후 삭제 시작
    if (!isDeleting && charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
      return;
    }
    // 삭제 완료 시 다음 텍스트로 이동
    else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, typingSpeed);
  }
  type();
}

/**
 * 현재 시간 표시
 */
function initTime() {
  const timeEl = document.getElementById('time');

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = hours + ':' + minutes;
  }

  updateTime();
  setInterval(updateTime, 30000); // 30초마다 업데이트
}

/**
 * 날씨 정보 (더미 데이터)
 */
function initWeather() {
  const weatherEl = document.getElementById('weather');

  // 더미 날씨 데이터
  const weatherData = [
    '☀️ 22°C 맑음',
    '⛅ 18°C 구름',
    '🌧️ 15°C 비',
    '❄️ 3°C 눈',
    '🌤️ 25°C 맑음'
  ];

  // 랜덤 날씨 표시
  const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
  weatherEl.textContent = randomWeather;
}

/**
 * 모바일 메뉴
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

/**
 * 부드러운 스크롤
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * GSAP 애니메이션
 */
function initAnimations() {
  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 배경 도형 회전
  gsap.to(".shape", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });

  // 스킬바 진행률 애니메이션
  document.querySelectorAll('.skill-progress').forEach(function (progress) {
    const width = progress.getAttribute('data-width');

    gsap.to(progress, {
      scrollTrigger: {
        trigger: progress.closest('.skill-card'),
        start: 'top 80%',
      },
      width: width + '%',
      duration: 1.5,
      ease: 'power2.out'
    });
  });

  // 카드 등장 애니메이션
  const cards = document.querySelectorAll('.skill-card, .career-item, .project-card');
  cards.forEach(function (card) {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

/**
 * 섹션별 파티클 효과 토글
 */
function initParticleToggler() {
  const particleCanvas = document.getElementById('particles');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const showParticles = entry.target.dataset.particles === 'true';
        particleCanvas.style.opacity = showParticles ? '0.6' : '0';
      }
    });
  }, {
    threshold: 0.5
  });

  // 모든 섹션을 관찰
  document.querySelectorAll('section').forEach(function (section) {
    observer.observe(section);
  });
}
