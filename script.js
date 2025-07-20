// 페이지 로드 완료 시 모든 기능 초기화
window.addEventListener('DOMContentLoaded', function () {
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
});

/**
 * 1. 로딩 화면 숨기기
 */
function hideLoading() {
  console.log('✅ 로딩 완료');
  const loading = document.querySelector('.loading');
  loading.style.opacity = '0';
  setTimeout(function () {
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

  // 파티클 그리기 함수
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

  document.addEventListener('mousemove', function (e) {
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
 * 5. 위젯: 현재 시간
 */
function initTime() {
  console.log('⏰ 시간 표시 시작');
  const timeEl = document.getElementById('time');

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = hours + ':' + minutes;
  }

  updateTime();
  // 30초마다 시간 업데이트
  setInterval(updateTime, 1000 * 30);
}

/**
 * 6. 위젯: 날씨 (더미 데이터)
 */
document.addEventListener('DOMContentLoaded', function () {
  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY;


  // 위치 정보를 요청해요
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 날씨 정보 요청 URL 만들기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;

    // 날씨 정보 불러오기
    fetch(url)
      .then(function (response) {
        return response.json(); // JSON 데이터로 바꾸기
      })
      .then(function (data) {
        // 필요한 정보 꺼내기
        const temp = Math.round(data.main.temp); // 온도
        const desc = data.weather[0].description; // 날씨 설명
        const iconCode = data.weather[0].icon; // 아이콘 코드
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // 화면에 출력하기
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
          <img src="${iconUrl}" alt="${desc}" style="height:24px; vertical-align:middle;">
          <span>${temp}°C ${desc}</span>
        `;
      })
      .catch(function (error) {
        console.log('날씨 정보를 가져오는 중 오류 발생:', error);
        document.getElementById('weather').textContent = '날씨 정보 오류';
      });

  }, function (error) {
    console.log('위치 정보를 가져올 수 없습니다:', error);
    document.getElementById('weather').textContent = '위치 권한 필요';
  });
});

/**
 * 7. 모바일 메뉴 (햄버거 버튼)
 */
function initMobileMenu() {
  console.log('📱 모바일 메뉴 시작');
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  // 햄버거 버튼 클릭 시 메뉴 토글
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
 * 8. 부드러운 스크롤
 */
function initSmoothScroll() {
  console.log('🎢 부드러운 스크롤 시작');
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // 네비게이션 높이만큼 여백
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

  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // 배경 도형 회전 애니메이션
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
 * 10. 섹션별 파티클 효과 토글
 */
function initParticleToggler() {
  console.log('💡 파티클 토글 기능 시작');
  const particleCanvas = document.getElementById('particles');

  // 교차 관찰자로 섹션 감지
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const showParticles = entry.target.dataset.particles === 'true';
        particleCanvas.style.opacity = showParticles ? '0.6' : '0';
      }
    });
  }, {
    threshold: 0.5 // 섹션의 50%가 보일 때 트리거
  });

  // 모든 섹션을 관찰 대상에 추가
  document.querySelectorAll('section').forEach(function (section) {
    observer.observe(section);
  });
}
