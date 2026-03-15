import { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, size: string, qty: number) => void;
  onRemove: (id: number, size: string) => void;
};

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 99;
const TAX_RATE = 0.05;

const CartDrawer = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) => {

  /* ---------------- CALCULATIONS ---------------- */

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);

  const shipping = useMemo(
    () => (subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST),
    [subtotal]
  );

  const total = subtotal + tax + shipping;

  const progress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  /* ---------------- UX IMPROVEMENTS ---------------- */

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  /* ---------------- UI ---------------- */

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 flex flex-col border-l border-border"
          >

            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold tracking-wider">
                YOUR BAG ({items.length})
              </h2>

              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-muted transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* FREE SHIPPING PROGRESS */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 text-sm">
                Spend ₹{FREE_SHIPPING_THRESHOLD - subtotal} more for
                <b> free shipping</b>

                <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <ShoppingBag size={60} className="mb-4 opacity-60" />
                  <p className="text-xl font-semibold">Your bag is empty</p>
                </div>
              )}

              {items.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 bg-muted/40 rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      Size: {item.size}
                    </p>

                    <p className="font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-2 mt-2">

                      <button
                        onClick={() =>
                          item.qty > 1 &&
                          onUpdateQty(item.id, item.size, item.qty - 1)
                        }
                        className="p-1 hover:text-primary"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="font-semibold text-sm">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          onUpdateQty(item.id, item.size, item.qty + 1)
                        }
                        className="p-1 hover:text-primary"
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => onRemove(item.id, item.size)}
                        className="ml-auto text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <div className="p-6 border-t space-y-4">

                <div className="text-sm space-y-1">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                </div>

                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                {/* CHECKOUT */}
                <a
                  href={`https://wa.me/916309503257?text=Hi! I'd like to place an order. Total: ₹${total}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center font-bold rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg hover:scale-[1.02] transition"
                >
                  ORDER VIA WHATSAPP
                </a>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;