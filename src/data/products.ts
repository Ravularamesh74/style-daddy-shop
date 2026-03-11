import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  tag?: string;
  category: string;
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Street Art Combo",
    price: 1499,
    originalPrice: 2499,
    image: product1,
    images: [product1, product2],
    tag: "COMBO",
    category: "T-SHIRTS",
    description: "Level up your street style with this killer combo pack. Includes a graphic tee and matching joggers. Perfect for those who live and breathe streetwear. Premium cotton blend for all-day comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Graphic Oversized Tee",
    price: 799,
    originalPrice: 1299,
    image: product2,
    images: [product2, product1],
    tag: "HOT 🔥",
    category: "T-SHIRTS",
    description: "Drop-shoulder oversized tee with bold graphic print. Made from 100% premium cotton for a soft, breathable feel. The relaxed fit makes it perfect for layering or wearing solo.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Cargo Joggers",
    price: 999,
    originalPrice: 1599,
    image: product3,
    images: [product3, product4],
    category: "PANTS",
    description: "Utility-inspired cargo joggers with multiple pockets and an elastic waistband. Tapered fit with ribbed cuffs for a clean silhouette. Built tough for everyday wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Minimal Logo Hoodie",
    price: 1299,
    originalPrice: 1999,
    image: product4,
    images: [product4, product3],
    tag: "NEW",
    category: "HOODIES",
    description: "Clean and minimal hoodie with subtle embroidered logo. Heavyweight fleece lining keeps you warm. Kangaroo pocket and adjustable drawstring hood. A wardrobe essential.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    name: "Tropical Print Shirt",
    price: 899,
    originalPrice: 1499,
    image: product5,
    images: [product5, product6],
    category: "SHIRTS",
    description: "Stand out with this vibrant tropical print button-down. Relaxed camp collar fit in lightweight viscose fabric. Perfect for weekend vibes and summer sessions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 6,
    name: "Distressed Denim Jacket",
    price: 1899,
    originalPrice: 2999,
    image: product6,
    images: [product6, product5],
    tag: "TRENDING",
    category: "JACKETS",
    description: "Classic denim jacket with strategic distressing for that lived-in look. Sturdy metal buttons and adjustable waist tabs. Layer it over anything for instant street cred.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export const categories = ["ALL", "T-SHIRTS", "PANTS", "HOODIES", "SHIRTS", "JACKETS"];
