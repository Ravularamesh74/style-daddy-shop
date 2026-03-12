import { Order } from "../types/order.types";

const PHONE_NUMBER = "916309503257";

const generateWhatsAppOrder = (order: Order): string => {

  const itemsText = order.items
    .map(
      (item) =>
        `• ${item.name} (${item.size ?? "-"}) x${item.quantity} - ₹${
          item.price * item.quantity
        }`
    )
    .join("\n");

  const address = order.shippingAddress
    ? `
📍 Delivery Address
${order.shippingAddress.fullName}
${order.shippingAddress.addressLine1}
${order.shippingAddress.city}, ${order.shippingAddress.state}
${order.shippingAddress.pincode}
`
    : "";

  const message = `
🛍️ *New Order - Style Daddy*

📦 Items:
${itemsText}

💰 Subtotal: ₹${order.subtotal}
🚚 Shipping: ₹${order.shipping}
🎟️ Discount: ₹${order.discount}
💳 Total: *₹${order.total}*

${address}

Please confirm my order.
`;

  const encodedMessage = encodeURIComponent(message.trim());

  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
};

export default generateWhatsAppOrder;