import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  stock?: number;
  onAddToCart: (id: number) => void;
};

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  tag,
  stock = 10,
  onAddToCart,
}: ProductCardProps) => {

  /* ---------- ENTERPRISE DISCOUNT LOGIC ---------- */

  const discount = useMemo(() => {
    if (!originalPrice) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }, [price, originalPrice]);

  const isOutOfStock = stock <= 0;

  /* ---------- HANDLERS ---------- */

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isOutOfStock) onAddToCart(id);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-300"
    >
      {/* TAG */}
      {tag && (
        <span className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wider">
          {tag}
        </span>
      )}

      {/* OUT OF STOCK */}
      {isOutOfStock && (
        <span className="absolute top-3 right-3 z-10 bg-destructive text-white text-xs px-3 py-1 rounded-full">
          SOLD OUT
        </span>
      )}

      {/* IMAGE */}
      <Link to={`/product/${id}`} aria-label={name}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      {!isOutOfStock && (
        <button
          onClick={handleAdd}
          aria-label="Add to cart"
          className="absolute bottom-[calc(25%+1rem)] right-4 p-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110 z-10"
        >
          <Plus size={20} />
        </button>
      )}

      {/* PRODUCT INFO */}
      <Link to={`/product/${id}`} className="block p-4">
        <h3 className="font-semibold text-lg tracking-wide line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-primary font-bold text-lg">
            ₹{price.toLocaleString()}
          </span>

          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}

          {discount && (
            <span className="text-green-600 text-xs font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default memo(ProductCard);