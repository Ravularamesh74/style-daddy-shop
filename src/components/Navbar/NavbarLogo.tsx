// NavbarLogo.tsx
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-bold text-gray-800"
    >
      <img
        src="/logo.png"
        alt="Website Logo"
        className="w-8 h-8 object-contain"
      />
      <span>Style Daddy</span>
    </Link>
  );
};

export default NavbarLogo;