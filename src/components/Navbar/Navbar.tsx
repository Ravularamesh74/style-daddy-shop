// Navbar.tsx
import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import NavbarMobileMenu from './NavbarMobileMenu';

const Navbar = () => {
  return (
    <nav>
      <NavbarLogo />
      <NavbarLinks />
      <NavbarMobileMenu />
    </nav>
  );
};

export default Navbar;