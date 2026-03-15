// NavbarMobileMenu.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
];

const NavbarMobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl text-gray-700 focus:outline-none"
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute right-0 mt-4 w-48 bg-white shadow-lg rounded-lg py-4">
          <ul className="flex flex-col text-gray-700">
            {navLinks.map((link, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100">
                <NavLink
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : ""
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileMenu;