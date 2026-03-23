#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/new-assignment.sh "Assignment Title"
  ./scripts/new-assignment.sh --date YYYY-MM-DD "Assignment Title"

Description:
  - Creates a new assignment folder under assignments/YYYY-MM-DD-slug
  - Generates README.md, ASSIGNMENT.md, RETRO.md
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

DATE_OVERRIDE=""
if [[ "${1:-}" == "--date" ]]; then
  if [[ $# -lt 3 ]]; then
    usage
    exit 1
  fi
  DATE_OVERRIDE="$2"
  shift 2
fi

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

if [[ ! -f "README.md" ]]; then
  echo "Error: run this script at repository root." >&2
  exit 1
fi

TITLE="$*"
DATE_STR="${DATE_OVERRIDE:-$(date +%F)}"

if [[ ! "$DATE_STR" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "Error: date must be YYYY-MM-DD." >&2
  exit 1
fi

SLUG="$(printf '%s' "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"

if [[ -z "$SLUG" ]]; then
  echo "Error: title produced an empty slug. Use letters/numbers in title." >&2
  exit 1
fi

ASSIGNMENT_DIR="assignments/${DATE_STR}-${SLUG}"

if [[ -e "$ASSIGNMENT_DIR" ]]; then
  echo "Error: directory already exists: $ASSIGNMENT_DIR" >&2
  exit 1
fi

mkdir -p "$ASSIGNMENT_DIR"

cat > "${ASSIGNMENT_DIR}/README.md" <<EOF
# ${TITLE}

## Overview

- Date: ${DATE_STR}
- Status: Planned

## Goal

- 

## Run

\`\`\`bash
npm install
npm run dev
\`\`\`

## Notes

- 
EOF

cat > "${ASSIGNMENT_DIR}/ASSIGNMENT.md" <<'EOF'
# Assignment Spec

## Topic

- 

## Requirements

- 

## Constraints

- 

## Done Criteria

- [ ] Functional requirements complete
- [ ] Error cases handled
- [ ] `npm run lint` passed
- [ ] `npm run build` passed
EOF

cat > "${ASSIGNMENT_DIR}/RETRO.md" <<'EOF'
# Retro

## What Went Well

- 

## What Was Hard

- 

## Next Actions

- 
EOF

echo "Created: ${ASSIGNMENT_DIR}"
echo "Next: add code and document details in ${ASSIGNMENT_DIR}/README.md."
