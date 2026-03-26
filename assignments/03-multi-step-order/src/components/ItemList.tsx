import type { ProductList } from "../types/productSchema";
import Item from "./Item";

type ItemListProps = {
  data: ProductList;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const ItemList = ({ data, onIncrease, onDecrease }: ItemListProps) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>상품 리스트</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 100,
          padding: 10,
          backgroundColor: "#88dfcb",
        }}
      >
        {data.map((product) => (
          <Item
            key={product.id}
            product={product}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))}
      </div>
    </>
  );
};

export default ItemList;
