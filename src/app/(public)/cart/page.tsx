import ProductCartClient from "@/components/cart/ProductCartClient";

export const metadata = {
  title: "Shopping Cart | Mere Pandit Ji",
  description: "Review items in your cart and proceed to secure checkout.",
};

export default function CartPage() {
  return <ProductCartClient />;
}
