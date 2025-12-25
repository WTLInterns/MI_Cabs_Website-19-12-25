"use client";

import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Logo from '../ui/Logo';
import BookingModal from '../sections/BookingModal';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Pet Taxi', path: '/pet-taxi' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      {/* Top Bar */}
   
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Logo size="md" className="h-12" />
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
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="text-gray-700 hover:text-blue-900 font-medium transition-colors text-sm uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="ml-2 bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-full transition-colors text-sm whitespace-nowrap"
          >
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
                className="block py-2.5 text-gray-700 hover:bg-gray-100 px-4 rounded-md text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full mt-3 bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-full transition-colors text-center block text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </header>
  );
}
