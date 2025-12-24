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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [tripType, setTripType] = useState('');

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
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Book Your Ride</h2>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">Note: Date format is DD/MM/YYYY (e.g., 25/12/2023)</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Trip Type *</label>
                  <div className="relative">
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="one-way">One Way</option>
                      <option value="round-trip">Round Trip</option>
                      <option value="rental">Rental</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pickup Location *</label>
                  <input 
                    type="text" 
                    placeholder="Enter pickup location" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Drop *</label>
                  <input 
                    type="text" 
                    placeholder="Drop location" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Pickup Date *</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Pickup Time *</label>
                    <input 
                      type="time" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                {(tripType === 'round-trip') && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Return Date *</label>
                        <input 
                          type="date" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Return Time *</label>
                        <input 
                          type="time" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <button 
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-md transition duration-300"
                >
                  BOOK NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
