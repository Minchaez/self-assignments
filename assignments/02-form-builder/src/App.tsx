import "./App.css";
import {
  createDefaultField,
  formBuilderSchema,
  type FieldSchema,
  type FormBuilderData,
} from "./types/formSchema";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

function App() {
  // 마지막으로 "검증 통과 후 제출"된 필드 스냅샷을 저장한다.
  // RHF 내부 입력 상태와 분리된 결과 뷰 용도라서 별도 state로 관리한다.
  const [submittedFields, setSubmittedFields] = useState<FieldSchema[] | null>(
    null,
  );

  // 폼 전체 상태를 RHF가 관리한다.
  // resolver: zod 스키마 기반 검증 연결
  // mode: "onChange"라서 입력 시점마다 에러가 즉시 반영된다.
  // defaultValues: useFieldArray가 다룰 루트 경로(fields)를 초기화한다.
  const form = useForm<FormBuilderData>({
    resolver: zodResolver(formBuilderSchema),
    mode: "onChange",
    defaultValues: { fields: [] },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  // 동적 배열 필드 전용 훅.
  // fields: 렌더링용 배열 메타데이터
  // append/remove: 항목 추가/삭제 API
  // keyName: RHF가 내부 키를 rhfId로 주입 (도메인 id와 충돌 방지)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
    keyName: "rhfId", // 기존 id(number)와 충돌 방지
  });

  // 새 필드 1개를 기본값으로 추가한다.
  const addField = () => {
    append(createDefaultField());
  };

  // handleSubmit이 zod 검증을 통과한 경우에만 호출된다.
  // 전달받은 데이터는 "유효한 폼 데이터"이므로 바로 결과 출력에 사용한다.
  const onsubmit = (data: FormBuilderData) => {
    setSubmittedFields(data.fields);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <button type="button" onClick={addField}>
        필드 추가
      </button>
      {fields.map((f, index) => (
        <div key={f.rhfId}>
          {/* name 검증 에러(빈 값/중복)를 해당 인덱스 입력 위에 표시 */}
          {errors.fields?.[index]?.name && (
            <p style={{ color: "red" }}>
              {errors.fields[index]?.name?.message}
            </p>
          )}
          {/* register 경로는 zod 스키마 구조(fields[index].xxx)와 일치해야 한다. */}
          <input {...register(`fields.${index}.label`)} placeholder="label" />
          <input {...register(`fields.${index}.name`)} placeholder="name" />
          {/* type은 enum(text/email/...)으로 검증된다. */}
          <select {...register(`fields.${index}.type`)}>
            <option value="text">text</option>
            <option value="email">email</option>
            <option value="number">number</option>
            <option value="select">select</option>
            <option value="checkbox">checkbox</option>
          </select>
          <label>
            {/* checkbox는 true/false boolean으로 RHF에 바인딩된다. */}
            <input type="checkbox" {...register(`fields.${index}.required`)} />
            required
          </label>
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}
      <button type="submit">제출</button>
      {/* 제출 성공 이후의 결과를 JSON으로 확인한다. */}
      {submittedFields && <pre>{JSON.stringify(submittedFields, null, 2)}</pre>}
    </form>
  );
}

export default App;
