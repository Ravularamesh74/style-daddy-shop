// NavbarLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLinks = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/shop">Shop</Link></li>
      <li><Link to="/cart">Cart</Link></li>
      <li><Link to="/checkout">Checkout</Link></li>
    </ul>
  );
};

export default NavbarLinks;