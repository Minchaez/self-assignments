import { type ProductList } from "../types/productSchema";
import Candy from "../assets/candy.jpeg";
import Chocolate from "../assets/chocolate.jpeg";
import Snack from "../assets/snack.jpeg";

export const MOCK_DATA: ProductList = [
  { id: 1, productName: "사탕", quantity: 0, price: 200, thumbnail: Candy },
  {
    id: 2,
    productName: "초콜릿",
    quantity: 0,
    price: 2000,
    thumbnail: Chocolate,
  },
  { id: 3, productName: "과자", quantity: 0, price: 1500, thumbnail: Snack },
];
