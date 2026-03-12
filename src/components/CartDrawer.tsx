import { useMemo } from "react";
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

const CartDrawer = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) => {

  /* ---------------- ENTERPRISE CALCULATIONS ---------------- */

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const tax = subtotal * 0.05;
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + tax + shipping;

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
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl font-bold tracking-wider">
                YOUR BAG
              </h2>

              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-muted transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                  <ShoppingBag size={60} className="mb-5 opacity-60" />
                  <p className="font-display text-xl mb-2">Your bag is empty</p>
                  <p className="text-sm">Add some products to start shopping.</p>
                </div>
              )}

              {items.map((item) => (
                <motion.div
                  layout
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 bg-muted/40 rounded-lg p-3"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      Size: {item.size}
                    </p>

                    <p className="font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* QTY CONTROLS */}
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

                      <span className="text-sm font-semibold">
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
                        className="ml-auto text-muted-foreground hover:text-destructive"
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
              <div className="p-6 border-t border-border space-y-4">

                <div className="space-y-1 text-sm">

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
                  className="block w-full py-4 text-center font-bold text-lg rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg hover:scale-[1.02] transition"
                >
                  ORDER VIA WHATSAPP
                </a>

                <p className="text-xs text-center text-muted-foreground">
                  Or DM us on Instagram <b>@_style_daddy_</b>
                </p>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;