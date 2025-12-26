import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-4">
              <div className="flex items-center mb-3">
                <Image 
                  src="/images/logo.jpg" 
                  alt="M.I  CABS Logo" 
                  width={100}
                  height={100}
                  className="rounded-full shadow-lg"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">M.I  CABS Pune</h3>
              <p className="text-gray-300 text-sm leading-normal max-w-md">
                Your trusted partner for reliable and affordable car rental services in Pune. We provide premium transportation solutions with a focus on comfort and punctuality.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-4 pb-1 border-b-2 border-blue-600 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Home
              </Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Services
              </Link></li>
              <li><Link href="/pet-taxi" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Pet Taxi
              </Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                About Us
              </Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Contact
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-4 pb-1 border-b-2 border-blue-600 inline-block">Contact Us</h4>
            <address className="not-italic space-y-4">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center text-gray-300 mb-1">
                  <FaMapMarkerAlt className="text-blue-500 mr-3" size={18} />
                  <span>Deccan, Pune, Maharashtra</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <a href="tel:+918805051404" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <FaPhoneAlt className="text-blue-500 mr-3" size={16} />
                  <span>+91 8805051404</span>
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <a href="mailto:micabspune@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <FaEnvelope className="text-blue-500 mr-3" size={16} />
                  <span>micabspune@gmail.com</span>
                </a>
              </div>
            </address>
            
            {/* Working Hours */}
            <div className="mt-6">
              <h5 className="font-semibold text-white mb-2">Working Hours</h5>
              <p className="text-gray-300">24/7 Service Available</p>
              <p className="text-sm text-gray-400 mt-2">For immediate assistance, call us anytime</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        {/* <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} M.I  CABS Pune. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Proudly serving Pune with reliable transportation services
          </p>
        </div> */}
      </div>
    </footer>
  );
}