import { z } from "zod";
import { ProductSchema } from "./productSchema";

// 주문자 정보
// 수령인, 연락처, 주소(우편번호 포함)
export const AddressSchema = z.object({
  sido: z.string(),
  sigungu: z.string(),
  streetName: z.string(),
  buildingNumber: z.number(),
  detail: z.string(),
  zipcode: z.string().min(1, "우편번호를 입력하세요."),
});

const OrdererSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: AddressSchema,
});

export const OrderForm = z.object({
  orderer: OrdererSchema,
  products: z.array(ProductSchema).min(1),
});

export type OrderFormValue = z.infer<typeof OrderForm>;
