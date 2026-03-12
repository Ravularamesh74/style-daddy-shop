// Checkout.tsx
import React from 'react';
import OrderSummary from '@/features/checkout/components/OrderSummary/OrderSummary';
import CouponInput from '@/features/checkout/components/CouponInput';
import ShippingEstimator from '@/features/checkout/components/ShippingEstimator';
import CheckoutButton from '@/features/checkout/components/CheckoutButton';

const Checkout = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <CouponInput />
      <ShippingEstimator />
      <OrderSummary />
      <CheckoutButton />
    </div>
  );
};

export default Checkout;