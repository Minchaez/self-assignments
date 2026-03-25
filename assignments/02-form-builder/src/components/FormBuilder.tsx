// 여기는 입력 필드를 보여주는 파일
// zod만을 사용하여 구현하였을 때 사용한 컴포넌트
import type { FieldSchema, FieldType } from "../types/formSchema";

interface FormBuilderProps {
  field: FieldSchema;
  deleteField: (id: number) => void;
  updateField: (id: number, patch: Partial<FieldSchema>) => void;
}

export const FormBuilder = ({
  field,
  deleteField,
  updateField,
}: FormBuilderProps) => {
  return (
    <>
      <input
        value={field.label}
        placeholder="label"
        onChange={(e) => updateField(field.id, { label: e.target.value })}
      />
      <input
        value={field.name}
        placeholder="name"
        onChange={(e) => updateField(field.id, { name: e.target.value })}
      />
      <select
        value={field.type}
        onChange={(e) =>
          updateField(field.id, { type: e.target.value as FieldType })
        }
      >
        <option value="text">text</option>
        <option value="email">email</option>
        <option value="number">number</option>
        <option value="select">select</option>
        <option value="checkbox">checkbox</option>
      </select>
      <input
        type="checkbox"
        checked={field.required}
        onChange={(e) => updateField(field.id, { required: e.target.checked })}
      />
      <button type="button" onClick={() => deleteField(field.id)}>
        삭제
      </button>
    </>
  );
};

export default FormBuilder;
