/* ---------------- ORDER ITEM ---------------- */

export interface OrderItem {
  id: string;
  productId: string;

  name: string;
  image?: string;

  price: number;
  quantity: number;

  size?: string;
  color?: string;
}


/* ---------------- ADDRESS ---------------- */

export interface Address {
  fullName: string;
  phone: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  country: string;

  pincode: string;
}


/* ---------------- PAYMENT ---------------- */

export type PaymentMethod =
  | "COD"
  | "UPI"
  | "RAZORPAY"
  | "STRIPE"
  | "WHATSAPP";


/* ---------------- ORDER STATUS ---------------- */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";


/* ---------------- ORDER ---------------- */

export interface Order {
  id: string;

  items: OrderItem[];

  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;

  total: number;
  currency: "INR";

  couponCode?: string;

  paymentMethod: PaymentMethod;

  status: OrderStatus;

  shippingAddress: Address;

  createdAt: string;
  updatedAt?: string;
}