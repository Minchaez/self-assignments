# Type-Safe GitHub Profile Searcher

GitHub 사용자 아이디를 입력하면 팔로워/팔로잉 수를 조회하는 React + TypeScript 과제입니다.

## 목적

- 타입 안정성을 유지한 API 호출 흐름 구성
- 빈 입력/404/네트워크 실패/성공 케이스 분기 처리
- self-assignment 과제 레포 형태로 기록 가능한 구조 유지

## 실행 방법

```bash
cd assignments/2026-03-23-type-safe-github-profile-searcher
npm install
npm run dev
```

## 스크립트

```bash
npm run dev     # 로컬 개발 서버
npm run lint    # ESLint 검사
npm run build   # 타입체크 + 빌드
npm run preview # 빌드 결과 미리보기
```

## 폴더 구조

```txt
src/
  api/
    github.ts
  types/
    github.ts
    index.ts
  App.tsx
  App.css
```

## 과제 체크리스트

- [x] 검색어 `trim()` 후 빈 입력 차단
- [x] API 함수 분리 (`src/api/github.ts`)
- [x] 타입 분리 (`src/types/github.ts`)
- [x] 로딩/에러/성공 조건부 렌더링
- [x] Enter 키 검색 동작

## GitHub 업로드 빠른 절차

```bash
# repo root에서 실행
git init
git add .
git commit -m "feat: initial self-assignment submission"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
