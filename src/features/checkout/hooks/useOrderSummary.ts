import { useMemo, useState } from "react";
import { type CartItem } from "@/components/CartDrawer";

type Coupon = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
};

type UseOrderSummaryParams = {
  items: CartItem[];
};

const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 2000;
const BASE_SHIPPING = 99;

const availableCoupons: Coupon[] = [
  { code: "STYLE10", type: "percentage", value: 10 },
  { code: "SAVE200", type: "fixed", value: 200 },
];

const useOrderSummary = ({ items }: UseOrderSummaryParams) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [shipping, setShipping] = useState<number>(0);

  // Subtotal
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  // Tax
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  // Shipping
  const calculatedShipping = useMemo(() => {
    if (shipping !== 0) return shipping;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING;
  }, [subtotal, shipping]);

  // Discount
  const discount = useMemo(() => {
    if (!coupon) return 0;

    if (coupon.type === "percentage") {
      return (subtotal * coupon.value) / 100;
    }

    return coupon.value;
  }, [coupon, subtotal]);

  // Total
  const total = useMemo(() => {
    return subtotal + tax + calculatedShipping - discount;
  }, [subtotal, tax, calculatedShipping, discount]);

  // Apply coupon
  const applyCoupon = (code: string) => {
    const found = availableCoupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );

    if (!found) return false;

    setCoupon(found);
    return true;
  };

  // Remove coupon
  const removeCoupon = () => {
    setCoupon(null);
  };

  return {
    items,
    subtotal,
    tax,
    shipping: calculatedShipping,
    discount,
    total,
    coupon,

    setShipping,
    applyCoupon,
    removeCoupon,
  };
};

export default useOrderSummary;