# Self-Assignment Repository

주기적으로 스스로 과제를 만들고, AI 사용을 최소화하여 구현/검증/회고를 기록하는 레포지토리입니다.

## 목적

- 실전형 문제 해결 루틴 유지
- TypeScript/React 기반 구현 역량 강화

## Repository Structure

```txt
.
├─ assignments/
│  └─ 01-topic-name/
│     ├─ README.md
│     ├─ ASSIGNMENT.md
│     └─ RETRO.md
├─ scripts/
│  └─ new-assignment.sh
└─ .github/
   └─ workflows/ci.yml
```

각 과제의 상세 내용은 해당 과제 폴더의 `README.md`에서 관리합니다.

## How To Add New Assignment

1. `./scripts/new-assignment.sh "과제 제목"` 실행
2. 생성된 과제 폴더에서 구현

## CI

GitHub Actions가 각 과제의 `lint/build`를 실행합니다.
