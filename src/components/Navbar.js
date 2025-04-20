"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-transparent z-50 sticky-top">
      <div className="container mx-auto flex justify-between items-center p-4 pl-10">
        {/* Logo */}
        <Link href="/" className="z-20">
          <Image
            src="/Logo.png"
            width={60}
            height={60}
            alt="Gabo The Barber Logo"
            className="hover:scale-105 transition-all duration-300 "
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-20 text-slate-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center gap-5">
          {/* Menu Items */}
          <ul className="flex gap-6 uppercase font-medium text-[var(--black)] text-xl font-heading">
            <li className="cursor-pointer navbar-link transition-colors duration-300">
              <Link href="/#about">About</Link>
            </li>
            <li className="cursor-pointer navbar-link transition-colors duration-300">
              <Link href="/#services">Services</Link>
            </li>
            <li className="cursor-pointer navbar-link transition-colors duration-300">
              <Link href="/#testimonials">Testimonials</Link>
            </li>
            <li className="cursor-pointer navbar-link transition-colors duration-300">
              <Link href="/#location">Location</Link>
            </li>
          </ul>
          <Link href="/book">
            <button className="navbar-button px-6 py-2 rounded-full cursor-pointer font-bold shadow-md hover:opacity-90">
              BOOK NOW
            </button>
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-10 flex flex-col items-center justify-center">
            <ul className="flex flex-col gap-8 uppercase font-medium text-slate-800 text-2xl text-center font-heading">
              <li className="cursor-pointer navbar-link transition-colors duration-300">
                <Link href="/#about" onClick={toggleMenu}>About</Link>
              </li>
              <li className="cursor-pointer navbar-link transition-colors duration-300">
                <Link href="/#services" onClick={toggleMenu}>Services</Link>
              </li>
              <li className="cursor-pointer navbar-link transition-colors duration-300">
                <Link href="/#testimonials" onClick={toggleMenu}>Testimonials</Link>
              </li>
              <li className="cursor-pointer navbar-link transition-colors duration-300">
                <Link href="/#location" onClick={toggleMenu}>Location</Link>
              </li>
              <li className="mt-4">
                <Link href="/book" onClick={toggleMenu}>
                  <button className="navbar-button px-8 py-3 rounded-full cursor-pointer font-bold shadow-md hover:opacity-90">
                    BOOK NOW
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
