import type { Product } from "../types/productSchema";

type ItemProps = {
  product: Product;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const Item = ({ product, onIncrease, onDecrease }: ItemProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: 20,
        textAlign: "center",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.productName}
        style={{ width: 200, height: 200 }}
      />
      <p>{product.productName}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          backgroundColor: "#ffffff",
          padding: 10,
        }}
      >
        <button onClick={() => onDecrease(product.id)}>-</button>
        {product.quantity}
        <button onClick={() => onIncrease(product.id)}>+</button>
      </div>
      {`총 금액 ${product.quantity * product.price}`}
    </div>
  );
};

export default Item;
