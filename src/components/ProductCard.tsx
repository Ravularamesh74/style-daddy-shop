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
  onAddToCart: (id: number) => void;
};

const ProductCard = ({ id, name, price, originalPrice, image, tag, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
    >
      {tag && (
        <span className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full font-display tracking-wider">
          {tag}
        </span>
      )}
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); onAddToCart(id); }}
        className="absolute bottom-[calc(25%+1rem)] right-4 p-3 bg-gradient-gold text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-glow hover:scale-110 z-10"
      >
        <Plus size={20} />
      </button>
      <Link to={`/product/${id}`} className="block p-4">
        <h3 className="font-display font-semibold text-lg tracking-wide">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary font-bold text-lg">₹{price}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm">₹{originalPrice}</span>
          )}
          {originalPrice && (
            <span className="text-accent text-xs font-bold">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
