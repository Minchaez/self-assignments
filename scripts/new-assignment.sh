#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

usage() {
  cat <<'EOU'
사용법:
  ./scripts/new-assignment.sh "과제 제목"

설명:
  - assignments/<번호>-<제목-슬러그> 폴더를 생성합니다. (예: 03-form-builder)
  - README.md, ASSIGNMENT.md, RETRO.md 템플릿을 생성합니다.
EOU
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

if [[ ! -f "README.md" ]]; then
  echo "Error: 저장소 루트에서 실행해주세요." >&2
  exit 1
fi

TITLE="$*"
SLUG="$(printf '%s' "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[[:space:]]+/-/g; s|/|-|g; s|^-+||; s|-+$||')"

if [[ -z "$SLUG" ]]; then
  echo "Error: 유효한 제목을 입력해주세요." >&2
  exit 1
fi

mkdir -p assignments

MAX_NUM=0
DIR_COUNT=0
while IFS= read -r dir; do
  DIR_COUNT=$((DIR_COUNT + 1))
  base="$(basename "$dir")"
  if [[ "$base" =~ ^([0-9]{2})- ]]; then
    num=$((10#${BASH_REMATCH[1]}))
    if (( num > MAX_NUM )); then
      MAX_NUM=$num
    fi
  fi
done < <(find assignments -mindepth 1 -maxdepth 1 -type d | sort)

if (( MAX_NUM > 0 )); then
  NEXT_NUM=$((MAX_NUM + 1))
else
  NEXT_NUM=$((DIR_COUNT + 1))
fi

INDEX="$(printf '%02d' "$NEXT_NUM")"
ASSIGNMENT_DIR="assignments/${INDEX}-${SLUG}"

if [[ -e "$ASSIGNMENT_DIR" ]]; then
  echo "Error: 이미 존재하는 폴더입니다: $ASSIGNMENT_DIR" >&2
  exit 1
fi

mkdir -p "$ASSIGNMENT_DIR"

cat > "${ASSIGNMENT_DIR}/README.md" <<EOR
# ${NEXT_NUM}. ${TITLE}

## 개요

- 과제 번호: ${INDEX}
- 상태: 준비 중

## 목표

- 

## 실행 방법

\`\`\`bash
npm install
npm run dev
\`\`\`

## 메모

- 
EOR

cat > "${ASSIGNMENT_DIR}/ASSIGNMENT.md" <<'EOA'
# 과제 명세

## 주제

- 

## 요구사항

- 

## 제약사항

- 

## 완료 기준

- [ ] 핵심 기능 구현 완료
- [ ] 예외/에러 케이스 처리
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
EOA

cat > "${ASSIGNMENT_DIR}/RETRO.md" <<'EOT'
# 회고

## 잘된 점

- 

## 아쉬운 점

- 

## 다음 과제 액션 아이템

- 
EOT

echo "생성 완료: ${ASSIGNMENT_DIR}"
echo "다음 단계: ${ASSIGNMENT_DIR}/README.md에 과제 설명을 채워주세요."
