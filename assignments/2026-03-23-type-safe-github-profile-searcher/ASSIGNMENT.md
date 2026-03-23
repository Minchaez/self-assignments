# Assignment Spec

## 주제

GitHub Profile Searcher (TypeScript 기반)

## 요구사항

- 사용자 ID를 입력하고 검색 버튼 또는 Enter로 조회
- GitHub API(`/users/:username`) 호출
- `followers`, `following`, `avatar_url` 표시
- 빈 입력/404/네트워크 실패 처리

## 구현 제약

- React + TypeScript 사용
- 타입과 API 호출 로직 분리
- `any` 사용 지양

## 완료 기준

- [x] 정상 조회 동작
- [x] 404 에러 메시지 노출
- [x] 빈 입력 차단
- [x] 네트워크/기타 에러 메시지 노출
- [x] 린트/빌드 통과
