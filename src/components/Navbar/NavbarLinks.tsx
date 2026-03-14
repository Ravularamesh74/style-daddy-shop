// NavbarLinks.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
];

const NavbarLinks: React.FC = () => {
  return (
    <ul className="flex gap-6 text-gray-700 font-medium">
      {navLinks.map((link, index) => (
        <li key={index}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `transition-colors hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;