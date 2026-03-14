// FooterLinks.tsx
import React from "react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Careers", url: "/careers" },
      { name: "Blog", url: "/blog" },
      { name: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", url: "/docs" },
      { name: "Help Center", url: "/help" },
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Features", url: "/features" },
      { name: "Pricing", url: "/pricing" },
      { name: "Integrations", url: "/integrations" },
      { name: "Updates", url: "/updates" },
    ],
  },
];

const FooterLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {footerLinks.map((section, index) => (
        <div key={index}>
          <h4 className="text-white font-semibold mb-3">
            {section.title}
          </h4>

          <ul className="space-y-2 text-sm">
            {section.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;