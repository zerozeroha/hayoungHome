const projectData = {
  wattsup: `
    <h3>🔹 1. WattsUp Dashboard</h3>
    <p><strong>📌 사이트 설명:</strong><br />
    에너지 데이터를 실시간 시각화하고 거래할 수 있는 핀테크 대시보드형 웹 서비스입니다.<br />
    공공데이터 API와 Kakao Map API를 연동해 발전소 위치 및 정보를 시각적으로 제공합니다.</p>

    <p><strong>🔗 프로젝트 링크:</strong><br />
    <a href="https://github.com/zerozeroha/WattsUp" target="_blank">https://github.com/zerozeroha/WattsUp</a></p>

    <p><strong>💻 포지션:</strong> Front-End Developer</p>

    <p><strong>🛠 역할:</strong></p>
    <ul>
      <li>전체 페이지 UI 설계 및 반응형 퍼블리싱</li>
      <li>컴포넌트 기반 구조 설계</li>
      <li>Recharts, Zustand, Framer Motion 등으로 실시간 데이터 시각화 및 인터랙션 구현</li>
      <li>Next.js SSR 적용을 통한 SEO 개선 및 성능 최적화</li>
    </ul>
  `,

  surveygacha: `
    <h3>🔹 2. SurveyGacha</h3>
    <p><strong>📌 사이트 설명:</strong><br />
    설문 참여 시 가챠(보상)를 제공하는 웹 기반 리서치 서비스로, 사용자 몰입도를 높이며 효율적인 데이터 수집을 유도합니다.</p>

    <p><strong>🔗 프로젝트 링크:</strong><br />
    <a href="https://github.com/zerozeroha/surveygacha" target="_blank">https://github.com/zerozeroha/surveygacha</a></p>

    <p><strong>💻 포지션:</strong> Front-End Developer</p>

    <p><strong>🛠 역할:</strong></p>
    <ul>
      <li>Figma 디자인 기반 퍼블리싱</li>
      <li>모바일/PC 반응형 UI 구현</li>
      <li>설문 작성 및 응답 흐름 설계</li>
      <li>Zustand 상태관리 및 Supabase 연동을 통한 설문 데이터 처리 구현</li>
    </ul>
  `,

  carini: `
    <h3>🔹 3. CARINI Web</h3>
    <p><strong>📌 사이트 설명:</strong><br />
    자동차 필터링, 지도 기반 추천, 비교 기능을 제공하는 차량 탐색 웹 플랫폼입니다.</p>

    <p><strong>🔗 프로젝트 링크:</strong><br />
    <em>배포 URL 없음 (팀 프로젝트)</em></p>

    <p><strong>💻 포지션:</strong> Front-End Developer</p>

    <p><strong>🛠 역할:</strong></p>
    <ul>
      <li>HTML/CSS/JS 기반 퍼블리싱</li>
      <li>Kakao Map API 연동으로 지도 기반 시각화</li>
      <li>Spring Boot 백엔드와의 연동 작업</li>
      <li>차량 필터링 및 검색 기능 데이터 처리</li>
    </ul>
  `,

  chatbot: `
    <h3>🔹 4. CARINI AI Chatbot</h3>
    <p><strong>📌 사이트 설명:</strong><br />
    차량 추천, 정보 탐색 기능을 제공하는 챗봇 기반 서비스로, 사용자의 대화 입력을 기반으로 필터링된 차량 정보를 제공합니다.</p>

    <p><strong>🔗 프로젝트 링크:</strong><br />
    <em>비공개 </em></p>

    <p><strong>💻 포지션:</strong> Front-End & 데이터 설계 지원</p>

    <p><strong>🛠 역할:</strong></p>
    <ul>
      <li>MySQL 기반 차량 데이터베이스 설계</li>
      <li>Python 기반 챗봇 대화 흐름 구성</li>
      <li>카카오 챗봇 API 연동 및 사용자 입력 처리 로직 설계</li>
    </ul>
  `,
}

const buttons = document.querySelectorAll('.project-btn')
const modal = document.getElementById('modal')
const modalText = document.getElementById('modalText')
const closeModal = document.getElementById('closeModal')

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project
    modalText.innerHTML = projectData[key]
    modal.classList.remove('hidden')
  })
})

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden')
})
