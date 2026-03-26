import { z } from "zod";

// 상품 정보
// 상품 이름, 수량
export const ProductSchema = z.object({
  id: z.number(),
  productName: z.string(),
  quantity: z.number(),
  price: z.number(),
  thumbnail: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// 상품 리스트는 상품들이 모인 배열과 같다.
export type ProductList = Product[];
