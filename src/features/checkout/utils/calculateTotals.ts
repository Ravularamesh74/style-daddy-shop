import { OrderItem } from "../types/order.types";

type TotalsResult = {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
};

const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 99;

const calculateTotals = (
  items: OrderItem[],
  discount: number = 0
): TotalsResult => {

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const total = subtotal + tax + shipping - discount;

  return {
    subtotal,
    tax,
    shipping,
    discount,
    total,
  };
};

export default calculateTotals;