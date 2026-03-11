import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Minus, Plus, Instagram } from "lucide-react";
import { products } from "@/data/products";
import logo from "@/assets/logo.png";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

type ProductDetailProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const ProductDetail = ({ cart, setCart }: ProductDetailProps) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = () => {
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === selectedSize);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize, qty },
      ];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, size: string, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id && item.size === size ? { ...item, qty: newQty } : item)));
  };

  const removeItem = (id: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-body">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary font-display tracking-wider hover:underline">
            ← BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/">
            <img src={logo} alt="Style Daddy" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 font-display text-sm tracking-widest font-semibold">
            <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
            <Link to="/#shop" className="hover:text-primary transition-colors">SHOP</Link>
          </div>
          <button onClick={() => setCartOpen(true)} className="relative p-2 hover:text-primary transition-colors">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm mb-8">
          <ArrowLeft size={16} /> BACK TO SHOP
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              {product.tag && (
                <span className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full font-display tracking-wider">
                  {product.tag}
                </span>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary shadow-glow" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-primary font-bold text-3xl font-display">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-muted-foreground line-through text-lg">₹{product.originalPrice}</span>
                  <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full font-display">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-display font-semibold tracking-wider text-sm mb-3">SELECT SIZE</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg font-display font-bold text-sm transition-all ${
                      selectedSize === size
                        ? "bg-gradient-gold text-primary-foreground shadow-glow"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:border-primary border border-border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-display font-semibold tracking-wider text-sm mb-3">QUANTITY</h3>
              <div className="inline-flex items-center gap-4 bg-muted rounded-lg px-4 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:text-primary transition-colors">
                  <Minus size={18} />
                </button>
                <span className="font-display font-bold text-lg w-8 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-1 hover:text-primary transition-colors">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={addToCart}
              className="w-full py-4 bg-gradient-gold text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg shadow-glow hover:scale-[1.02] transition-transform mb-4"
            >
              ADD TO BAG — ₹{(product.price * qty).toLocaleString()}
            </button>

            <a
              href={`https://wa.me/919999999999?text=Hi! I'm interested in ${product.name} (Size: ${selectedSize}, Qty: ${qty}) from Style Daddy`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 border border-border text-foreground font-display font-bold tracking-wider rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              ORDER VIA WHATSAPP
            </a>

            {/* Info */}
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>📦 Free delivery in Hyderabad</p>
              <p>💬 DM us on Instagram <a href="https://instagram.com/_style_daddy_" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@_style_daddy_</a> to order</p>
              <p>📍 Visit us at Nacharam, Hyderabad</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10 px-4 mt-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/"><img src={logo} alt="Style Daddy" className="h-10" /></Link>
          <p className="text-muted-foreground text-sm text-center">© 2026 Style Daddy. All rights reserved.</p>
          <a href="https://instagram.com/_style_daddy_" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
        </div>
      </footer>

      <WhatsAppButton />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onUpdateQty={updateQty} onRemove={removeItem} />
    </div>
  );
};

export default ProductDetail;
