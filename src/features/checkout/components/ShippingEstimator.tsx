import { useState } from "react";
import { Truck, Loader2, MapPin } from "lucide-react";

type ShippingEstimatorProps = {
  subtotal: number;
  onShippingCalculated?: (shipping: number) => void;
};

const ShippingEstimator = ({
  subtotal,
  onShippingCalculated,
}: ShippingEstimatorProps) => {
  const [pincode, setPincode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [deliveryDays, setDeliveryDays] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEstimate = async () => {
    if (pincode.length < 6) {
      setError("Enter a valid pincode");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Example shipping rules
      let cost = 0;
      let days = 3;

      if (subtotal < 2000) {
        cost = 99;
      }

      // Example remote area logic
      if (pincode.startsWith("79")) {
        cost += 50;
        days = 5;
      }

      setShippingCost(cost);
      setDeliveryDays(days);

      onShippingCalculated?.(cost);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">

      <h3 className="font-semibold flex items-center gap-2">
        <Truck size={18} />
        Shipping Estimator
      </h3>

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          maxLength={6}
          onChange={(e) => setPincode(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleEstimate}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Checking
            </>
          ) : (
            <>
              <MapPin size={16} />
              Estimate
            </>
          )}
        </button>

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {shippingCost !== null && (
        <div className="text-sm space-y-1">

          <p>
            Shipping Cost:{" "}
            <span className="font-semibold">
              {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
            </span>
          </p>

          {deliveryDays && (
            <p className="text-muted-foreground">
              Estimated delivery: {deliveryDays}–{deliveryDays + 2} days
            </p>
          )}

        </div>
      )}

    </div>
  );
};

export default ShippingEstimator;