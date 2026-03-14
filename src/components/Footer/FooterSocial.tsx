// FooterSocial.tsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: <FaLinkedin />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: <FaTwitter />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram />,
  },
];

const FooterSocial: React.FC = () => {
  return (
    <div className="flex gap-4 text-xl">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="hover:text-white transition-colors"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;