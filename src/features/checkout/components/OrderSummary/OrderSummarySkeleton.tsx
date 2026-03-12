import { memo } from "react";

const shimmer =
  "animate-pulse bg-muted rounded-md";

const OrderSummarySkeleton = () => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">

      {/* Title */}
      <div className={`h-6 w-40 ${shimmer}`} />

      {/* Item skeletons */}
      <div className="space-y-4">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4"
          >
            {/* Image */}
            <div className={`w-14 h-14 ${shimmer}`} />

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className={`h-4 w-48 ${shimmer}`} />
              <div className={`h-3 w-28 ${shimmer}`} />
            </div>

            {/* Price */}
            <div className={`h-4 w-16 ${shimmer}`} />
          </div>
        ))}

      </div>

      {/* Totals skeleton */}
      <div className="border-t pt-4 space-y-3">

        <div className="flex justify-between">
          <div className={`h-3 w-20 ${shimmer}`} />
          <div className={`h-3 w-16 ${shimmer}`} />
        </div>

        <div className="flex justify-between">
          <div className={`h-3 w-16 ${shimmer}`} />
          <div className={`h-3 w-12 ${shimmer}`} />
        </div>

        <div className="flex justify-between">
          <div className={`h-3 w-20 ${shimmer}`} />
          <div className={`h-3 w-14 ${shimmer}`} />
        </div>

      </div>

      {/* Total */}
      <div className="flex justify-between border-t pt-4">
        <div className={`h-5 w-16 ${shimmer}`} />
        <div className={`h-5 w-20 ${shimmer}`} />
      </div>

      {/* Checkout button */}
      <div className={`h-12 w-full ${shimmer}`} />

    </section>
  );
};

export default memo(OrderSummarySkeleton);