import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleHamburgerClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={handleHamburgerClick}
        className="fixed top-3 left-5 z-[1001] bg-transparent border-none cursor-pointer flex flex-col justify-center text-xl items-center"
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={handleClose}
          className="fixed inset-0 w-screen h-screen bg-black/30 z-[1000]"
        />
      )}

      {/* Side Drawer */}
      <nav
        className={`fixed top-0 left-0 w-[220px] h-screen bg-white shadow-lg z-[1001] transition-all duration-300 flex flex-col pt-[60px] ${
          open ? "translate-x-0" : "-translate-x-[220px]"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 bg-transparent border-none text-2xl cursor-pointer"
          aria-label="Close navigation menu"
        >
          &times;
        </button>
        <Link
          to="/"
          onClick={handleClose}
          className="px-6 py-4 no-underline text-neutral-800 font-medium text-lg hover:bg-neutral-100 transition"
        >
          FirstPage
        </Link>
        <Link
          to="/second"
          onClick={handleClose}
          className="px-6 py-4 no-underline text-neutral-800 font-medium text-lg hover:bg-neutral-100 transition"
        >
          SecondPage
        </Link>
        <Link
          to="/third"
          onClick={handleClose}
          className="px-6 py-4 no-underline text-neutral-800 font-medium text-lg hover:bg-neutral-100 transition"
        >
          ThirdPage
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
