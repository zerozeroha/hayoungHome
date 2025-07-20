// 페이지 로드 완료 시 모든 기능 초기화
window.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 포트폴리오 시작!');

  // 2초 후 로딩 화면 숨기기
  setTimeout(hideLoading, 2000);

  // 각 기능 실행
  initCanvas();
  initCursor();
  initTyping();
  initTime();
  initWeather();
  initMobileMenu();
  initSmoothScroll();
  initAnimations();
  initParticleToggler();
  // initCounter(); // 카운터 기능이 삭제되어 주석 처리 또는 삭제
});


/**
 * 1. 로딩 화면 숨기기
 */
function hideLoading() {
  console.log('✅ 로딩 완료');
  const loading = document.querySelector('.loading');
  loading.style.opacity = '0';
  setTimeout(() => {
    loading.style.display = 'none';
  }, 500);
}


/**
 * 2. Canvas 파티클 효과
 */
function initCanvas() {
  console.log('🎨 Canvas 파티클 시작');
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const particles = [];
  let particleCount = 50;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(220, 38, 38, 0.5)';
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}


/**
 * 3. 커스텀 커서
 */
function initCursor() {
  console.log('🖱️ 커스텀 커서 시작');
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}


/**
 * 4. 타이핑 효과
 */
function initTyping() {
  console.log('⌨️ 타이핑 효과 시작');
  const texts = [
    '사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다.',
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

    if (!isDeleting && charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
      return;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, typingSpeed);
  }
  type();
}


/**
 * 5. 위젯: 현재 시간
 */
function initTime() {
  console.log('⏰ 시간 표시 시작');
  const timeEl = document.getElementById('time');

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 1000 * 30);
}


/**
 * 6. 위젯: 날씨 (더미 데이터)
 */
function initWeather() {
  console.log('🌤️ 날씨 위젯 시작');
  const weatherData = ['22°C 맑음', '18°C 흐림', '25°C 구름'];
  const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
  document.getElementById('weather').textContent = randomWeather;
}


/**
 * 7. 모바일 메뉴 (햄버거 버튼)
 */
function initMobileMenu() {
  console.log('📱 모바일 메뉴 시작');
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
}


/**
 * 8. 부드러운 스크롤
 */
function initSmoothScroll() {
  console.log('🎢 부드러운 스크롤 시작');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 9. 스크롤 기반 애니메이션 (GSAP & ScrollTrigger)
 */
function initAnimations() {
  console.log('✨ GSAP 애니메이션 시작');
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  gsap.to(".shape", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });

  document.querySelectorAll('.skill-progress').forEach(progress => {
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

  const cards = document.querySelectorAll('.skill-card, .career-item, .project-card');
  cards.forEach(card => {
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
 * 10. 섹션별 파티클 효과 토글
 */
function initParticleToggler() {
  console.log('💡 파티클 토글 기능 시작');
  const particleCanvas = document.getElementById('particles');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const showParticles = entry.target.dataset.particles === 'true';
        particleCanvas.style.opacity = showParticles ? '0.6' : '0';
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}
