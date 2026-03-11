import { useState } from "react";
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

const CartDrawer = ({ open, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl font-bold tracking-wider">YOUR BAG</h2>
              <button onClick={onClose} className="p-2 hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="font-display text-xl">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-muted rounded-lg p-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      <p className="text-primary font-bold">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => onRemove(item.id, item.size)}
                          className="ml-auto p-1 text-accent hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between font-display text-xl font-bold">
                  <span>TOTAL</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
                <a
                  href="https://wa.me/919999999999?text=Hi! I'd like to place an order from Style Daddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-gradient-gold text-primary-foreground font-display font-bold text-center text-lg tracking-wider rounded-lg shadow-glow hover:scale-[1.02] transition-transform"
                >
                  ORDER VIA WHATSAPP
                </a>
                <p className="text-xs text-muted-foreground text-center">
                  DM us on Instagram @_style_daddy_ to order
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
