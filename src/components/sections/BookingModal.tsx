"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaUserTie, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

interface FormData {
  tripType: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  rentalDays: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    tripType: 'round',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    rentalDays: '1',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [emailStatus, setEmailStatus] = useState<{status: 'idle' | 'loading' | 'success' | 'error', message: string}>({status: 'idle', message: ''});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus({status: 'loading', message: 'Sending your booking request...'});

    try {
      // Initialize EmailJS with your public key from environment variables
      await emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

      // Prepare template parameters with form data
      const templateParams = {
        from_name: formData.name || 'Anonymous User',
        to_email: process.env.NEXT_PUBLIC_OFFICIAL_EMAIL || 'your-email@example.com', // Your official email
        trip_type: formData.tripType,
        pickup_location: formData.pickup,
        drop_location: formData.drop || 'N/A', // For round trip, drop is not applicable
        pickup_date: formData.date,
        pickup_time: formData.time,
        return_date: formData.returnDate || 'N/A', // For one-way trip, return date is not applicable
        return_time: formData.returnTime || 'N/A', // For one-way trip, return time is not applicable
        rental_days: formData.rentalDays,
        user_name: formData.name,
        user_email: formData.email || 'N/A',
        user_phone: formData.phone,
        special_instructions: formData.message || 'N/A',
        reply_to: formData.phone || process.env.NEXT_PUBLIC_OFFICIAL_EMAIL || 'your-email@example.com'
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', // Your Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', // Your Template ID
        templateParams
      );

      if (response.status === 200) {
        setEmailStatus({status: 'success', message: 'Your booking request has been sent successfully! We will contact you shortly.'});
        // Reset form after successful submission
        setFormData({
          tripType: 'round',
          pickup: '',
          drop: '',
          date: '',
          time: '',
          returnDate: '',
          returnTime: '',
          rentalDays: '1',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(`Email sending failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Email sending error:', error);
      setEmailStatus({status: 'error', message: `Failed to send booking request: ${error?.message || 'Unknown error'}`});
    }
  };

  const renderFormFields = () => {
    switch (formData.tripType) {
      case 'oneway':
        return (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="pickup"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Drop Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="drop"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter drop location"
                  value={formData.drop}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 'round':
        return (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="pickup"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Drop Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="drop"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter drop location"
                  value={formData.drop}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Return Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="returnDate"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Return Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="returnTime"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.returnTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 'local':
        return (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="pickup"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Drop Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="drop"
                  className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter drop location"
                  value={formData.drop}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Number of Days *</label>
              <select 
                name="rentalDays"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                value={formData.rentalDays}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => (
                  <option key={day} value={day}>
                    {day} {day === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Book Your Ride</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">Note: Date format is DD/MM/YYYY (e.g., 25/12/2023)</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Trip Type *</label>
              <div className="relative">
                <select 
                  name="tripType"
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  value={formData.tripType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="oneway">One Way</option>
                  <option value="round">Round Trip</option>
                  <option value="local">Rental</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Full Name *</label>
                <div className="relative">
                  <FaUserTie className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Phone Number *</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {renderFormFields()}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-base shadow-lg transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={emailStatus.status === 'loading'}
            >
              {emailStatus.status === 'loading' ? 'SENDING...' : 'BOOK NOW'}
            </button>

            {/* Status Messages */}
            {emailStatus.status !== 'idle' && (
              <div className={`mt-3 p-3 rounded-lg ${emailStatus.status === 'success' ? 'bg-green-100 text-green-800' : emailStatus.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {emailStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}