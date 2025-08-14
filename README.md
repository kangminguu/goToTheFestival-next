<img width="1028" height="301" alt="Frame 587" src="https://github.com/user-attachments/assets/fbda5e84-029b-4bf4-b482-5b296ed09e34" />

# 축제가자

## 프로젝트 개요
`goToTheFestival`는 국내 축제 정보를 제공하고 사용자 후기를 작성·관리할 수 있는 웹 서비스입니다. 
기존 React 기반 CSR 프로젝트를 Next.js 기반 SSR 방식으로 재개발하여 성능과 SEO를 개선하고, 사용자 경험을 높였습니다.

### 🎯 이전 [React 기반 축제가자 프로젝트](https://github.com/kangminguu/goToTheFestival) 문제점
|<img height="400" alt="2025-08-14 16 10 41" src="https://github.com/user-attachments/assets/b5a08887-26ba-4e5d-b576-e984dd4bc035" />|<img height="400" alt="2025-08-14 16 10 54" src="https://github.com/user-attachments/assets/8b3fda48-0a9b-4dff-a569-6c1deb140d54" />|
|--|--|

기존 프로젝트는 모바일 형식만 지원하는 UI와 불편한 사용자 경험을 제공했습니다. 또한 CSR 방식으로 검색엔진 최적화에 취약하고 클라이언트에 fetch나 API 요청 엔드포인트가 노출되는 취약점도 있었습니다. 

이러한 문제를 해결하고자 개선된 UI와 Next.js로 다시 설계를 하였습니다.

## 기술 스택 및 구조

### 🔨 기술 스택
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</div>

### 📁 주요 폴더
- `app/`: Next.js 페이지 및 레이아웃 구조  
- `components/`: 재사용 가능한 UI 컴포넌트  
- `lib/`: API 및 유틸 함수  
- `stores/`: Zustand 기반 상태 관리  
- `public/`, `styles/`, Tailwind 및 설정 파일 포함

## 주요 기능
- 축제 정보 조회
  - 다양한 축제 정보를 카테고리와 검색 기능으로 확인
- 검색 및 필터링
  - 키워드와 필터를 활용한 편리한 축제 검색
- 후기 작성 및 관리
  - 로그인 사용자 대상 후기 작성, 삭제
  - `supabase`를 사용하여 카카오 로그인 구현 및 후기 작성

|<img width="932" height="1919" alt="제목 없음-1" src="https://github.com/user-attachments/assets/5122832c-08b7-4678-8bcd-c587ed9f07f5" />|<img width="932" height="1282" alt="23123" src="https://github.com/user-attachments/assets/627c17d6-5633-4cc3-bd2d-ccebe34c0680" />|<img width="932" height="1282" alt="1121121" src="https://github.com/user-attachments/assets/4d80707b-4c35-4afc-93a6-94a7b3f24de5" />|<img width="932" height="1919" alt="3456345" src="https://github.com/user-attachments/assets/64a27fb2-0bff-4a49-bcab-e113c643b979" />|<img width="932" height="1919" alt="14513431" src="https://github.com/user-attachments/assets/d60dcae7-3772-49ed-8f36-1a8677ddf8b7" />|
|--|--|--|--|--|
|메인페이지|찜한 축제|마이페이지|축제 상세|후기 작성|

|<img height="400" alt="2025-08-14 13 53 15" src="https://github.com/user-attachments/assets/1c43f443-7e1f-4619-b245-17a1366e3793" />|<img height="400" alt="2025-08-14 11 33 25" src="https://github.com/user-attachments/assets/5daf25b0-9ea2-486a-bdef-733ac040baa8" />|
|--|--|
|모바일:메인페이지|모바일축제 상세|
