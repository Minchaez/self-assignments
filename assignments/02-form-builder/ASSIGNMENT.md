# 과제 명세

## 주제

- Form Builder (React + TypeScript)

## 요구사항

- 필드를 추가/수정/삭제할 수 있어야 한다.
- 필드 타입은 최소 `text`, `email`, `number`, `select`, `checkbox`를 지원한다.
- 각 필드는 `label`, `name`, `required`를 설정할 수 있어야 한다.
- `name`은 중복될 수 없고, 중복 시 에러를 표시한다.
- 미리보기 폼에서 입력 후 제출하면 결과를 JSON으로 확인할 수 있어야 한다.

## 제약사항

- React + TypeScript 사용
- `any` 사용 금지
- 타입(`FieldSchema`)을 명시적으로 정의

## 완료 기준

- [x] 필드 생성/수정/삭제 동작 확인
- [x] 중복 `name` 및 `required` 검증 동작 확인
- [x] 스키마 저장/복원(localStorage) 동작 확인
- [x] `npm run lint` passed
- [x] `npm run build` passed
