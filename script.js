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
  // 모바일에서는 파티클 수 줄여서 성능 최적화
  let particleCount = window.innerWidth < 768 ? 25 : 50;

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
 * 커스텀 커서 (데스크톱에서만)
 */
function initCursor() {
  // 모바일/태블릿에서는 커서 기능 비활성화
  if (window.innerWidth < 1024) return;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

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

  if (!typingElement) return;

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
  if (!timeEl) return;

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
 * 날씨
 */
function initWeather() {
  const weatherEl = document.getElementById('weather');
  if (!weatherEl) return;

  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY;

  // API 키 확인
  if (!API_KEY || API_KEY === undefined) {
    weatherEl.textContent = '🌤️ 서울 날씨';
    console.warn('API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
    return;
  }

  console.log('API 키 로드 성공!');

  // 로딩 메시지
  weatherEl.textContent = '날씨 불러오는 중...';

  // 내 위치 가져오기
  navigator.geolocation.getCurrentPosition(
    function (position) {
      getWeatherData(position.coords.latitude, position.coords.longitude);
    },
    function () {
      weatherEl.textContent = '📍 위치 권한을 허용해주세요';
    }
  );

  // 실제 날씨 데이터 가져오는 함수
  function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(function (data) {
        console.log('날씨 데이터 로드 성공!');

        const temp = Math.round(data.main.temp);
        const weather = data.weather[0].description;

        weatherEl.textContent = `🌤️ ${temp}°C ${weather}`;
      })
      .catch(function (error) {
        console.error('날씨 API 에러:', error);
        weatherEl.textContent = '❌ 날씨를 불러올 수 없어요';
      });
  }
}

/**
 * 모바일 메뉴
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  // 요소가 존재하는지 확인
  if (!menuBtn || !navMenu) {
    console.log('메뉴 요소를 찾을 수 없습니다.');
    return;
  }

  console.log('모바일 메뉴 초기화 완료');

  // 햄버거 버튼 클릭 이벤트
  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');

    console.log('메뉴 토글:', navMenu.classList.contains('active'));
  });

  // 메뉴 항목 클릭 시 메뉴 닫기
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      menuBtn.classList.remove('active');
      console.log('메뉴 닫기');
    });
  });

  // 메뉴 외부 클릭 시 닫기 (단, 햄버거 버튼은 제외)
  document.addEventListener('click', function (e) {
    if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        console.log('외부 클릭으로 메뉴 닫기');
      }
    }
  });

  // 화면 크기 변경 시 메뉴 리셋
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
      menuBtn.classList.remove('active');
    }
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
  // GSAP가 로드되지 않은 경우 기본 애니메이션으로 대체
  if (typeof gsap === 'undefined') {
    console.log('GSAP가 로드되지 않았습니다. 기본 애니메이션을 사용합니다.');
    initBasicAnimations();
    return;
  }

  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

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
 * 기본 애니메이션 (GSAP 없이)
 */
function initBasicAnimations() {
  // 스크롤 시 요소 등장 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // 스킬바 애니메이션
        const skillProgress = entry.target.querySelector('.skill-progress');
        if (skillProgress) {
          const width = skillProgress.getAttribute('data-width');
          setTimeout(() => {
            skillProgress.style.width = width + '%';
          }, 200);
        }
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들
  const animateElements = document.querySelectorAll('.skill-card, .career-item, .project-card');
  animateElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
  });
}

/**
 * 섹션별 파티클 효과 토글
 */
function initParticleToggler() {
  const particleCanvas = document.getElementById('particles');
  if (!particleCanvas) return;

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

// 화면 크기 변경 시 파티클 수 재조정
window.addEventListener('resize', function () {
  // 디바운스 처리
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    // 필요시 캔버스 다시 초기화
    if (window.innerWidth !== window.lastWidth) {
      window.lastWidth = window.innerWidth;
      initCanvas();
    }
  }, 250);
});

// 페이지 가시성 변경 시 애니메이션 일시정지 (성능 최적화)
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    // 페이지가 숨겨지면 애니메이션 일시정지
    console.log('페이지 숨김 - 애니메이션 일시정지');
  } else {
    // 페이지가 다시 보이면 애니메이션 재시작
    console.log('페이지 표시 - 애니메이션 재시작');
  }
});
