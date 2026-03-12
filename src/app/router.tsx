// router.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import ShopPage from '@/pages/Shop/ShopPage';
import ProductPage from '@/pages/Product/ProductPage';
import CartPage from '@/pages/Cart/CartPage';
import CheckoutPage from '@/pages/Checkout/CheckoutPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import MainLayout from '@/layouts/MainLayout';

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;