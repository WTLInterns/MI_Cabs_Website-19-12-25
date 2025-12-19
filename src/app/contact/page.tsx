"use client";

import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const contactCards = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 bg-gray-900">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for any inquiries or assistance. We're here to help you with your travel needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactCards.map((card, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                {card.link ? (
                  <a 
                    href={card.link} 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {card.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{card.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
