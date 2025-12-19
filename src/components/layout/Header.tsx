"use client";

import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Logo from '../ui/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Pet Taxi', path: '/pet-taxi' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
   
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Logo className="h-12 w-auto" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="ml-4 bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Book Now
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block py-2 text-gray-700 hover:bg-gray-100 px-3 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full mt-2 bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
