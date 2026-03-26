# 과제 명세

## 주제

- Multi-Step Order (React + TypeScript + RHF + Zod)

## 요구사항

- 3단계 단계별 주문 프로세스 구현:
  - Step 1(배송 정보): 수령인, 연락처, 주소(우편번호 포함) 입력.
  - Step 2(상품 선택): 상품명, 수량, 가격을 동적으로 추가/삭제 가능해야 함.
  - Step 3: 결제 버튼 클릭 시, 주문 JSON 프리뷰

- 단계별 유효성 검사: 현재 단계의 폼이 유효(Valid)하지 않으면 다음 단계로 넘어갈 수 없도록 제어.

- 최종 요약: 모든 입력이 완료된 후, 마지막 확인 페이지에서 전체 데이터를 JSON 형태로 요약 출력.

- 데이터 흐름 관리: 각 단계 이동 시 기존에 입력한 데이터가 초기화되지 않고 유지되어야 함.

## 제약사항

- React Hook Form (RHF): FormProvider와 useFormContext를 사용하여 컴포넌트 간 결합도 낮추기.

- Zod: 전체 폼 데이터를 아우르는 통합 스키마를 정의하고, z.infer를 통해 TypeScript 타입 추출.

- UI/Logic: 외부 UI 라이브러리(MUI, AntD 등) 사용 없이 순수 CSS/Tailwind와 직접 만든 Input 컴포넌트 활용.

- TypeScript: any 사용 금지 및 useFieldArray 사용 시 각 아이템의 고유 ID(key) 관리 철저.

## 완료 기준

- [x] 단계별 유효성 검사 및 네비게이션: 각 Step의 isValid 상태에 따른 페이지 이동 제어 확인.
- [x] 동적 배열 관리: 상품 목록 추가/삭제 시 데이터 불변성 유지 및 정확한 타입 추론 확인.
- [x] 예외/에러 케이스 처리: 빈 값 제출 시 인라인 에러 노출 및 잘못된 경로 접근 시 1단계 리다이렉트.
- [x] `npm run lint` 통과
- [x] `npm run build` 통과
