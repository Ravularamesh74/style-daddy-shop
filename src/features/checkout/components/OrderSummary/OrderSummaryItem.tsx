import { memo } from "react";
import { type CartItem } from "@/components/CartDrawer";

type OrderSummaryItemProps = {
  item: CartItem;
};

const OrderSummaryItem = ({ item }: OrderSummaryItemProps) => {

  const lineTotal = item.price * item.qty;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="w-14 h-14 rounded-md object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">

        <p className="font-medium text-sm leading-tight">
          {item.name}
        </p>

        <p className="text-xs text-muted-foreground">
          Size {item.size} • Qty {item.qty}
        </p>

      </div>

      {/* Price */}
      <div className="text-right">

        <p className="text-sm font-semibold">
          ₹{lineTotal.toLocaleString()}
        </p>

        <p className="text-xs text-muted-foreground">
          ₹{item.price} each
        </p>

      </div>

    </div>
  );
};

export default memo(OrderSummaryItem);