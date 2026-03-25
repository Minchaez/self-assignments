// 데이터 타입을 정의하는 파일
import { z } from "zod";

// 허용되는 필드 타입의 단일 소스.
// UI(select 옵션), 타입 추론, 런타임 검증이 동일 목록을 공유한다.
const fieldTypeValues = [
  "text",
  "email",
  "number",
  "select",
  "checkbox",
] as const;
export const fieldTypeSchema = z.enum(fieldTypeValues);
export type FieldType = z.infer<typeof fieldTypeSchema>;

// select 타입 필드가 가질 수 있는 옵션(label/value) 구조
export const fieldOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

// 개별 필드 스키마(각 필드가 가져야 할 타입)
export const fieldSchema = z.object({
  id: z.number(),
  // z.enum을 써서 실제 런타임에서도 허용값만 통과시킨다.
  type: fieldTypeSchema,
  label: z.string(),
  // trim 후 min(1): 공백만 입력한 경우도 에러 처리
  name: z.string().trim().min(1, "이름을 입력해주세요"),
  required: z.boolean(),
  // type이 select일 때 사용할 수 있는 확장 필드(현재 UI에서는 미사용)
  options: z.array(fieldOptionSchema).optional(),
});

// fieldSchema를 z.infer 매서드를 통해 타입 자동추론 시킨 뒤 type으로 export
export type FieldSchema = z.infer<typeof fieldSchema>;

// 전체 폼 빌더 스키마 (필드 배열 + 중복 검증)
export const formBuilderSchema = z
  .object({ fields: z.array(fieldSchema) })
  .superRefine(({ fields }, ctx) => {
    // name -> 최초 등장 index 맵
    const seen = new Map<string, number>();
    fields.forEach((f, i) => {
      // name 자체 검증(min 1)과 중복 판단 기준을 맞추기 위해 trim 사용
      const n = f.name.trim();
      if (!n) return;
      const prev = seen.get(n);
      if (prev !== undefined) {
        const message =
          "중복된 name이 존재합니다. 각 필드의 name은 고유해야 합니다.";
        // 현재 중복 항목과 기존 항목 둘 다 에러로 표시해
        // 사용자가 어떤 두 항목이 충돌했는지 바로 알 수 있게 한다.
        ctx.addIssue({ code: "custom", path: ["fields", i, "name"], message });
        ctx.addIssue({
          code: "custom",
          path: ["fields", prev, "name"],
          message,
        });
      } else {
        seen.set(n, i);
      }
    });
  });

// formBuilderSchema를 z.infer 매서드를 통해 타입 자동추론 시킨 뒤 type으로 export
export type FormBuilderData = z.infer<typeof formBuilderSchema>;

// Date.now() 직접 사용 시 같은 ms에 중복될 수 있어 증가형 seed를 둔다.
let fieldIdSeed = Date.now();

const nextFieldId = (): number => {
  fieldIdSeed += 1;
  return fieldIdSeed;
};

export const createDefaultField = (): FieldSchema => ({
  id: nextFieldId(),
  type: "text",
  label: "",
  name: "",
  required: false,
});

// 필드 스키마의 배열 형태가 폼 스키마
export type FormSchema = FieldSchema[];
