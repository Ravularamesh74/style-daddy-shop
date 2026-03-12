import { memo } from "react";

type OrderSummaryTotalsProps = {
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
};

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

const OrderSummaryTotals = ({
  subtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
}: OrderSummaryTotalsProps) => {

  const total = subtotal + tax + shipping - discount;

  return (
    <div className="border-t border-border pt-4 space-y-3 text-sm">

      {/* Subtotal */}
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Subtotal
        </span>
        <span className="font-medium">
          {formatCurrency(subtotal)}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Tax
        </span>
        <span>
          {formatCurrency(tax)}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Shipping
        </span>
        <span>
          {shipping === 0 ? "Free" : formatCurrency(shipping)}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-{formatCurrency(discount)}</span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between text-lg font-bold border-t pt-3">
        <span>Total</span>
        <span className="text-primary">
          {formatCurrency(total)}
        </span>
      </div>

    </div>
  );
};

export default memo(OrderSummaryTotals);