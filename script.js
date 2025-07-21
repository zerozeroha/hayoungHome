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
  initProjectPopup();
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
 * GSAP 애니메이션 - 마우스 호버 기반으로 변경
 */
function initAnimations() {
  // 모든 스킬바를 초기에 0%로 설정
  document.querySelectorAll('.skill-progress').forEach(function (progress) {
    progress.style.width = '0%';
  });

  // GSAP가 로드되지 않은 경우 기본 애니메이션으로 대체
  if (typeof gsap === 'undefined') {
    console.log('GSAP가 로드되지 않았습니다. 기본 애니메이션을 사용합니다.');
    initBasicAnimations();
    return;
  }

  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 스킬카드 마우스 호버 애니메이션
  document.querySelectorAll('.skill-card').forEach(function (card) {
    const progress = card.querySelector('.skill-progress');
    const width = progress.getAttribute('data-width');
    let currentAnimation = null;

    // 마우스 올릴 때 - 100% 채우기
    card.addEventListener('mouseenter', function () {
      if (currentAnimation) currentAnimation.kill();
      currentAnimation = gsap.to(progress, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.out'
      });
    });

    // 마우스 뗄 때 - 0%로 비우기
    card.addEventListener('mouseleave', function () {
      if (currentAnimation) currentAnimation.kill();
      currentAnimation = gsap.to(progress, {
        width: '0%',
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  });

  // 카드 등장 애니메이션 (스크롤 기반 유지)
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
 * 기본 애니메이션 (GSAP 없이) - 마우스 호버 기반으로 변경
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
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들
  const animateElements = document.querySelectorAll('.skill-card, .career-item, .project-card');
  animateElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);

    // 스킬카드에만 마우스 호버 효과 추가
    if (el.classList.contains('skill-card')) {
      const progress = el.querySelector('.skill-progress');
      if (progress) {
        // 마우스 올릴 때 - 100% 채우기
        el.addEventListener('mouseenter', function () {
          progress.style.width = '100%';
          progress.style.transition = 'width 1s ease';
        });

        // 마우스 뗄 때 - 0%로 비우기
        el.addEventListener('mouseleave', function () {
          progress.style.width = '0%';
          progress.style.transition = 'width 1s ease';
        });
      }
    }
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

/**
 * 프로젝트 팝업 기능
 */
function initProjectPopup() {
  console.log('팝업 초기화 시작');

  // 프로젝트 데이터
  const projectData = {
    wattsup: {
      title: 'WattsUp Dashboard',
      subtitle: '에너지 데이터 시각화 플랫폼',
      description: '한국전력 API를 활용하여 실시간 에너지 사용량을 모니터링하고 에너지 거래를 할 수 있는 플랫폼입니다. 사용자는 직관적인 대시보드를 통해 에너지 소비 패턴을 분석하고, 효율적인 에너지 관리를 할 수 있습니다.',
      features: [
        '실시간 에너지 사용량 모니터링',
        '에너지 거래 및 매매 기능',
        '사용량 분석 및 리포트 생성',
        '반응형 대시보드 인터페이스'
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
      github: 'https://github.com/zerozeroha',
      demo: 'https://watts-up-n9ow.vercel.app/'
    },
    survey: {
      title: 'SurveyGacha',
      subtitle: '설문조사 플랫폼',
      description: '설문 참여 시 포인트를 획득하여 다양한 보상을 받을 수 있는 재미있는 설문조사 플랫폼입니다. 게임적 요소를 도입하여 사용자 참여도를 높였습니다.',
      features: [
        '설문 참여 포인트 시스템',
        '가챠 시스템으로 보상 획득',
        '다양한 설문 유형 지원',
        '실시간 결과 확인'
      ],
      tech: ['React', 'TypeScript', 'Zustand', 'Supabase'],
      github: 'https://github.com/zerozeroha',
      demo: 'https://surveygacha.vercel.app/about'
    },
    carini: {
      title: 'CARINI Web',
      subtitle: '지도 기반 차량 탐색 플랫폼',
      description: '카카오맵 API를 활용하여 사용자 위치 기반으로 주변 중고차 매물을 쉽게 검색할 수 있는 플랫폼입니다. 지도 인터페이스로 직관적인 차량 검색이 가능합니다.',
      features: [
        '위치 기반 차량 검색',
        '카카오맵 API 연동',
        '실시간 매물 정보 업데이트',
        '필터 기능으로 조건별 검색'
      ],
      tech: ['JavaScript', 'Kakao Map API', 'Spring Boot', 'MySQL'],
      github: 'https://github.com/zerozeroha'
    }
  };

  // 팝업 요소들 가져오기
  const popup = document.getElementById('project-popup');
  const popupBody = document.getElementById('popup-body');
  const closeBtn = document.querySelector('.popup-close');

  if (!popup || !popupBody || !closeBtn) {
    console.error('팝업 요소들을 찾을 수 없습니다!');
    return;
  }

  // 프로젝트 카드들에 클릭 이벤트 추가
  const projectCards = document.querySelectorAll('.project-card');
  console.log('프로젝트 카드 개수:', projectCards.length);

  projectCards.forEach(function (card, index) {
    const projectKey = card.getAttribute('data-project');
    console.log(`카드 ${index}: data-project = ${projectKey}`);

    card.addEventListener('click', function () {
      console.log('카드 클릭됨:', projectKey);
      const project = projectData[projectKey];

      if (project) {
        showPopup(project);
      } else {
        console.error('프로젝트 데이터를 찾을 수 없음:', projectKey);
      }
    });
  });

  // 팝업 보여주기
  function showPopup(project) {
    console.log('팝업 표시:', project.title);

    const content = `
      <h2 class="popup-title">${project.title}</h2>
      <p class="popup-subtitle">${project.subtitle}</p>
      <p class="popup-description">${project.description}</p>

      <div class="popup-features">
        <h4>주요 기능</h4>
        <ul>
          ${project.features.map(feature => `<li>• ${feature}</li>`).join('')}
        </ul>
      </div>

      <div class="popup-tech">
        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
      </div>

      <div class="popup-links">
        <a href="${project.github}" class="popup-link" target="_blank">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a href="${project.demo}" class="popup-link" target="_blank">
          <i class="fas fa-external-link-alt"></i> Demo
        </a>
      </div>
    `;

    popupBody.innerHTML = content;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }

  // 팝업 닫기
  function closePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // 스크롤 복원
  }

  // 닫기 버튼 클릭
  closeBtn.addEventListener('click', closePopup);

  // 배경 클릭 시 닫기
  popup.addEventListener('click', function (e) {
    if (e.target === popup) {
      closePopup();
    }
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.style.display === 'block') {
      closePopup();
    }
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
