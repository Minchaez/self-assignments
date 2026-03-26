import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderForm, type OrderFormValue } from "../types/orderSchema";
import { MOCK_DATA } from "../mock/mockData";
import ItemList from "./ItemList";

const Form = () => {
  const [preview, setPreview] = useState<OrderFormValue | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormValue>({
    resolver: zodResolver(OrderForm),
    defaultValues: {
      orderer: {
        name: "",
        phone: "",
        address: {
          zipcode: "",
          sido: "",
          sigungu: "",
          streetName: "",
          buildingNumber: 0,
          detail: "",
        },
      },
      products: MOCK_DATA.map((p) => ({ ...p })),
    },
    mode: "onSubmit",
  });

  const products = watch("products") ?? [];

  const handleIncrease = (id: number) => {
    const idx = products.findIndex((p) => p.id === id);
    if (idx < 0) return;

    setValue(`products.${idx}.quantity`, products[idx].quantity + 1, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleDecrease = (id: number) => {
    const index = products.findIndex((p) => p.id === id);
    if (index < 0) return;

    const nextQuantity = Math.max(0, products[index].quantity - 1);
    setValue(`products.${index}.quantity`, nextQuantity, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<OrderFormValue> = (data) => {
    setPreview(data);
  };
  return (
    <>
      <ItemList
        data={products}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="수령인" {...register("orderer.name")} />
          <p>{errors.orderer?.name?.message}</p>
        </div>
        <div>
          <input placeholder="연락처" {...register("orderer.phone")} />
          <p>{errors.orderer?.phone?.message}</p>
        </div>
        <div>
          <input
            placeholder="우편번호"
            {...register("orderer.address.zipcode")}
          />
          <p>{errors.orderer?.address?.zipcode?.message}</p>
        </div>
        <div>
          <input placeholder="시/도" {...register("orderer.address.sido")} />
          <p>{errors.orderer?.address?.sido?.message}</p>
        </div>
        <div>
          <input
            placeholder="시/군/구"
            {...register("orderer.address.sigungu")}
          />
          <p>{errors.orderer?.address?.sigungu?.message}</p>
        </div>
        <div>
          <input
            placeholder="도로명"
            {...register("orderer.address.streetName")}
          />
          <p>{errors.orderer?.address?.streetName?.message}</p>
        </div>
        <div>
          <input
            placeholder="건물번호"
            {...register("orderer.address.buildingNumber", {
              valueAsNumber: true,
            })}
          />
          <p>{errors.orderer?.address?.buildingNumber?.message}</p>
        </div>
        <div>
          <input
            placeholder="상세주소"
            {...register("orderer.address.detail")}
          />
        </div>
        <button type="submit">결제</button>
      </form>
      {preview && (
        <>
          <h2>주문 JSON 프리뷰</h2>
          <pre>{JSON.stringify(preview, null, 2)}</pre>
        </>
      )}
    </>
  );
};

export default Form;
