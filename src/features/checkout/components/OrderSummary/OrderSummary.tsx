import { memo, useMemo } from "react";
import { type CartItem } from "@/components/CartDrawer";

type OrderSummaryProps = {
  items: CartItem[];
  shipping?: number;
  discount?: number;
};

const OrderSummary = ({ items, shipping = 0, discount = 0 }: OrderSummaryProps) => {

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const tax = useMemo(() => subtotal * 0.05, [subtotal]);

  const total = useMemo(
    () => subtotal + tax + shipping - discount,
    [subtotal, tax, shipping, discount]
  );

  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">

      <h2 className="text-xl font-bold font-display tracking-wide">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex justify-between text-sm"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground">
                Size {item.size} × {item.qty}
              </p>
            </div>

            <span className="font-semibold">
              ₹{(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(0)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

      </div>

      {/* Final Total */}
      <div className="flex justify-between text-lg font-bold border-t pt-3">
        <span>Total</span>
        <span className="text-primary">
          ₹{total.toLocaleString()}
        </span>
      </div>

    </section>
  );
};

export default memo(OrderSummary);