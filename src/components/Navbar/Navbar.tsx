// Navbar.tsx
import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";

const Navbar: React.FC = () => {
  return (
    <nav
      className="w-full bg-white shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <NavbarLogo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavbarLinks />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <NavbarMobileMenu />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;