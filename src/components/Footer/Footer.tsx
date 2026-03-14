// Footer.tsx
import React from "react";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";

interface FooterProps {
  companyName?: string;
}

const Footer: React.FC<FooterProps> = ({ companyName = "Ramesh" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 text-gray-300 py-12 px-6 mt-20"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {companyName}
          </h2>
          <p className="text-sm leading-relaxed">
            Building scalable web experiences and modern applications.
            Focused on performance, accessibility, and clean design.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Quick Links
          </h3>
          <FooterLinks />
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Connect With Us
          </h3>
          <FooterSocial />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {currentYear} {companyName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;