import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Instagram, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero-fashion.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";

const products = [
  { id: 1, name: "Street Art Combo", price: 1499, originalPrice: 2499, image: product1, tag: "COMBO" },
  { id: 2, name: "Graphic Oversized Tee", price: 799, originalPrice: 1299, image: product2, tag: "HOT 🔥" },
  { id: 3, name: "Cargo Joggers", price: 999, originalPrice: 1599, image: product3 },
  { id: 4, name: "Minimal Logo Hoodie", price: 1299, originalPrice: 1999, image: product4, tag: "NEW" },
  { id: 5, name: "Tropical Print Shirt", price: 899, originalPrice: 1499, image: product5 },
  { id: 6, name: "Distressed Denim Jacket", price: 1899, originalPrice: 2999, image: product6, tag: "TRENDING" },
];

const categories = ["ALL", "T-SHIRTS", "PANTS", "HOODIES", "SHIRTS", "JACKETS"];

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const addToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id && item.size === "M");
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.size === "M" ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, size: "M", qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, size: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id && item.size === size ? { ...item, qty } : item)));
  };

  const removeItem = (id: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Marquee Banner */}
      <div className="bg-gradient-gold text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap font-display tracking-widest text-sm font-bold">
          <span className="mx-8">🔥 STAY TRENDY.. STAY DADDY! 🔥</span>
          <span className="mx-8">💥 FLAT 40% OFF ON ALL ITEMS 💥</span>
          <span className="mx-8">📍 NACHARAM, HYDERABAD 📍</span>
          <span className="mx-8">💬 DM TO ORDER 💬</span>
          <span className="mx-8">🔥 STAY TRENDY.. STAY DADDY! 🔥</span>
          <span className="mx-8">💥 FLAT 40% OFF ON ALL ITEMS 💥</span>
          <span className="mx-8">📍 NACHARAM, HYDERABAD 📍</span>
          <span className="mx-8">💬 DM TO ORDER 💬</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <img src={logo} alt="Style Daddy" className="h-12 w-auto" />
          <div className="hidden md:flex items-center gap-8 font-display text-sm tracking-widest font-semibold">
            <a href="#home" className="hover:text-primary transition-colors">HOME</a>
            <a href="#shop" className="hover:text-primary transition-colors">SHOP</a>
            <a href="#about" className="hover:text-primary transition-colors">ABOUT</a>
            <a href="#contact" className="hover:text-primary transition-colors">CONTACT</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:text-primary transition-colors">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col p-4 gap-4 font-display tracking-widest font-semibold">
              <a href="#home" onClick={() => setMobileMenu(false)}>HOME</a>
              <a href="#shop" onClick={() => setMobileMenu(false)}>SHOP</a>
              <a href="#about" onClick={() => setMobileMenu(false)}>ABOUT</a>
              <a href="#contact" onClick={() => setMobileMenu(false)}>CONTACT</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-[90vh] overflow-hidden">
        <img src={heroImg} alt="Style Daddy Fashion" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(0 0% 5% / 0.7) 0%, transparent 60%)" }} />
        <div className="relative container mx-auto h-full flex items-end pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full font-display text-sm font-bold tracking-wider mb-4">
              NEW COLLECTION 2026
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
              STAY <span className="text-gradient-gold">TRENDY</span>
              <br />
              STAY <span className="text-gradient-gold">DADDY</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Your ultimate streetwear destination in Nacharam, Hyderabad. Bold styles, unbeatable prices.
            </p>
            <div className="flex gap-4">
              <a
                href="#shop"
                className="inline-block px-8 py-4 bg-gradient-gold text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg shadow-glow hover:scale-105 transition-transform"
              >
                SHOP NOW
              </a>
              <a
                href="https://instagram.com/_style_daddy_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-border text-foreground font-display font-bold tracking-wider rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                FOLLOW US
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              TRENDING <span className="text-gradient-gold">DROPS</span>
            </h2>
            <p className="text-muted-foreground mt-3">Curated streetwear for the bold.</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide justify-center flex-wrap">
            {Categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-display text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-gradient-gold text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Style Daddy Logo" className="w-48 mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              WHO WE <span className="text-gradient-gold">ARE</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Style Daddy is Nacharam's go-to streetwear brand. We bring the latest trends straight 
              to your wardrobe at prices that won't break the bank. From oversized tees to cargo joggers, 
              we've got everything to keep your drip game strong. 💥
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-gradient-gold">57+</span>
                <p className="text-sm text-muted-foreground mt-1">Posts</p>
              </div>
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-gradient-gold">1.3K</span>
                <p className="text-sm text-muted-foreground mt-1">Followers</p>
              </div>
              <div className="text-center">
                <span className="font-display text-3xl font-bold text-gradient-gold">100%</span>
                <p className="text-sm text-muted-foreground mt-1">Trendy</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src={product2} alt="Fashion" className="rounded-xl shadow-card w-full h-64 object-cover" />
            <img src={product4} alt="Fashion" className="rounded-xl shadow-card w-full h-64 object-cover mt-8" />
            <img src={product5} alt="Fashion" className="rounded-xl shadow-card w-full h-64 object-cover -mt-4" />
            <img src={product6} alt="Fashion" className="rounded-xl shadow-card w-full h-64 object-cover mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-8">
              VISIT <span className="text-gradient-gold">US</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <a
                href="https://instagram.com/_style_daddy_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-8 bg-card rounded-xl shadow-card hover:shadow-glow transition-all hover:scale-105"
              >
                <Instagram size={32} className="text-primary" />
                <h3 className="font-display font-bold text-lg">INSTAGRAM</h3>
                <p className="text-muted-foreground text-sm">@_style_daddy_</p>
              </a>
              <div className="flex flex-col items-center gap-3 p-8 bg-card rounded-xl shadow-card">
                <MapPin size={32} className="text-primary" />
                <h3 className="font-display font-bold text-lg">LOCATION</h3>
                <p className="text-muted-foreground text-sm text-center">
                  7-26/3, opp CS Brother, New Raghavendra Nagar, Nacharam, Hyderabad 500076
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 p-8 bg-card rounded-xl shadow-card">
                <Phone size={32} className="text-primary" />
                <h3 className="font-display font-bold text-lg">ORDER</h3>
                <p className="text-muted-foreground text-sm">DM us on Instagram to place your order</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logo} alt="Style Daddy" className="h-10" />
          <p className="text-muted-foreground text-sm text-center">
            © 2026 Style Daddy. All rights reserved. Stay Trendy.. Stay Daddy! 💥
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/_style_daddy_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
};

export default Index;
