"use client";

import { useState } from 'react';
import { FaPaw, FaCalendarAlt, FaClock, FaDog, FaCat } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupDate: string;
  pickupTime: string;
  petType: string;
  petName: string;
  specialInstructions: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    petType: '',
    petName: '',
    specialInstructions: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: string; text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch('/api/book-pet-taxi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitMessage({ type: 'success', text: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          pickupAddress: '',
          dropoffAddress: '',
          pickupDate: '',
          pickupTime: '',
          petType: '',
          petName: '',
          specialInstructions: ''
        });
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: result.message || 'Failed to submit booking request. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FaPaw className="text-5xl text-blue-900" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Book Your Pet's Taxi Ride</h2>
            <p className="text-gray-600">
              Fill out the form below to book a safe and comfortable ride for your furry friend
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-lg">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Personal Information</h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                {/* Pet Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Pet Information</h3>
                  
                  <div>
                    <label htmlFor="petType" className="block text-gray-700 mb-2">Pet Type *</label>
                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="petName" className="block text-gray-700 mb-2">Pet Name *</label>
                    <input
                      type="text"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your pet's name"
                    />
                  </div>
                </div>
              </div>
              
              {/* Journey Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-900 border-b pb-2">Journey Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupAddress" className="block text-gray-700 mb-2">Pickup Address *</label>
                    <textarea
                      id="pickupAddress"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full pickup address"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="dropoffAddress" className="block text-gray-700 mb-2">Drop-off Address *</label>
                    <textarea
                      id="dropoffAddress"
                      name="dropoffAddress"
                      value={formData.dropoffAddress}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full drop-off address"
                    ></textarea>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="pickupDate" className="block text-gray-700 mb-2">Pickup Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="pickupTime" className="block text-gray-700 mb-2">Pickup Time *</label>
                    <div className="relative">
                      <input
                        type="time"
                        id="pickupTime"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FaClock className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Processing...' : 'BOOK NOW'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Special Instructions */}
              <div>
                <label htmlFor="specialInstructions" className="block text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requirements for your pet (medication, allergies, behavior notes, etc.)"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}