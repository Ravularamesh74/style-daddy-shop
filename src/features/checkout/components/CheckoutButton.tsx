import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Loader2 } from "lucide-react";

type CheckoutButtonProps = {
  disabled?: boolean;
  itemsCount: number;
  total: number;
  onCheckout?: () => Promise<void> | void;
};

const CheckoutButton = ({
  disabled,
  itemsCount,
  total,
  onCheckout,
}: CheckoutButtonProps) => {

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (disabled || itemsCount === 0) return;

    try {
      setLoading(true);

      if (onCheckout) {
        await onCheckout();
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={handleCheckout}
      disabled={disabled || itemsCount === 0 || loading}
      className={`
        w-full
        flex
        items-center
        justify-center
        gap-2
        py-4
        rounded-lg
        font-semibold
        text-lg
        transition-all
        shadow-lg
        ${
          disabled || itemsCount === 0
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-xl"
        }
      `}
    >

      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Processing...
        </>
      ) : (
        <>
          <ShoppingBag size={20} />
          Checkout • ₹{total.toLocaleString()}
        </>
      )}

    </motion.button>
  );
};

export default CheckoutButton;