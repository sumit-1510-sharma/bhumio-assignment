import React from "react";
import bar_image from "../assets/bar_image.png";
import logo_image from "../assets/logo_image.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between px-6 py-4">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src={logo_image} alt="Logo" className="h-10 w-auto" />
      </div>
      {/* Right: Links and Barcode */}
      <div className="flex items-center gap-8">
        {/* Links (vertical) */}
        <div className="flex flex-col items-center gap-1">
          <a
            href="https//www.bhumio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-sm"
          >
            https//www.bhumio.com
          </a>
          <a
            href="sales@bhumio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-sm"
          >
            sales@bhumio.com
          </a>
        </div>
        {/* Barcode image */}
        <img src={bar_image} alt="Bar Code" className="h-12 w-auto" />
      </div>
    </div>
  );
};

export default Footer;
