import { useState } from "react";

type ShippingResult = {
  cost: number;
  days: number;
};

const FREE_SHIPPING_THRESHOLD = 2000;
const BASE_SHIPPING_COST = 99;

const useShippingCalculator = (subtotal: number) => {
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState<ShippingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateShipping = async (pincode: string) => {
    if (!pincode || pincode.length !== 6) {
      setError("Enter a valid pincode");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let cost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_COST;
      let days = 3;

      // Example remote region rule
      if (pincode.startsWith("79") || pincode.startsWith("78")) {
        cost += 50;
        days = 5;
      }

      const result: ShippingResult = {
        cost,
        days,
      };

      setShipping(result);

      return result;

    } catch (err) {
      setError("Failed to calculate shipping");
    } finally {
      setLoading(false);
    }
  };

  const resetShipping = () => {
    setShipping(null);
    setError(null);
  };

  return {
    shipping,
    loading,
    error,

    calculateShipping,
    resetShipping,
  };
};

export default useShippingCalculator;