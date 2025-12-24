'use client';

import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTimes, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactUsToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only render the toggle after component mounts to avoid hydration issues
    setIsVisible(true);
  }, []);

  const contactCards: ContactCard[] = [
    {
      icon: <FaPhoneAlt className="text-3xl text-blue-600" />,
      title: "Call Us",
      content: "+91 8805051404",
      link: "tel:+918805051404"
    },
    {
      icon: <FaEnvelope className="text-3xl text-blue-600" />,
      title: "Mail Us",
      content: "micabspune@gmail.com",
      link: "mailto:micabspune@gmail.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
      title: "Location",
      content: "Deccan, Pune"
    }
  ];

  const toggleContact = () => {
    setIsOpen(!isOpen);
  };

  const closeContact = () => {
    setIsOpen(false);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleContact}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close contact information" : "Open contact information"}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-900 hover:bg-blue-800 shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isOpen ? (
          <FaTimes className="text-xl md:text-2xl" />
        ) : (
          <FaComments className="text-xl md:text-2xl" />
        )}
      </button>

      {/* Contact Information Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-40 w-80 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 
                  id="contact-dialog-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Contact Us
                </h3>
                <button
                  onClick={closeContact}
                  aria-label="Close contact panel"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4"
              >
                {contactCards.map((card, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{card.title}</h4>
                      {card.link ? (
                        <a 
                          href={card.link}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={(e) => {
                            if (card.link?.startsWith('tel:')) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          {card.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{card.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  We're here to help you with your travel needs. Contact us anytime!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
            className="fixed inset-0 bg-black z-30"
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUsToggle;