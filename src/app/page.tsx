"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaWhatsapp } from 'react-icons/fa';
import { FaTaxi, FaCar, FaShuttleVan, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaMoneyBillWave, FaClock, FaUserTie, FaShieldAlt, FaArrowRight, FaBus, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Components
import ContactUsToggle from '@/components/sections/ContactUsToggle';

// StatItem component with counting animation
const StatItem = ({ value, label }: { value: string; label: string }) => {
  const [count, setCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start counting animation when element is in view
          const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
          let startTime: number | null = null;
          const duration = 2000;
          
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease-out function for smooth animation
            const easedProgress = 1 - Math.pow(1 - percentage, 3);
            const currentCount = Math.floor(easedProgress * numericValue);
            
            setCount(currentCount);
            
            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [value]);
  
  return (
    <div ref={elementRef} className="text-center p-6 bg-white rounded-lg shadow-md">
      <div className="text-3xl font-bold text-blue-900 mb-2">
        {value.includes('+') ? `${count}+` : count}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

// WhatsApp Floating Button Component
const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/918805051404";
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-xl md:text-2xl" />
    </a>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const services = [
  {
    title: 'Trambakeshwar',
    image: '/images/Trambakeshwar.jpeg',
    icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />
  },
  {
    title: 'Lawasa',
    image: '/images/Lawasa.jpeg',
    icon: <FaCar className="text-blue-500 text-2xl" />
  },
  {
    title: 'Mumbai',
    image: '/images/Mumbai.jpeg',
    icon: <FaTaxi className="text-blue-500 text-2xl" />
  },
  {
    title: 'Mahableshwar',
    image: '/images/Mahableshwar.jpeg',
    icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />
  }
];
const features = [
  {
    title: '24/7 Service',
    description: 'Round the clock availability for your convenience',
    icon: <FaClock className="text-blue-500 text-3xl mb-4" />
  },
  {
    title: 'Best Rates',
    description: 'Competitive pricing with no hidden charges',
    icon: <FaMoneyBillWave className="text-blue-500 text-3xl mb-4" />
  },
  {
    title: 'Professional Drivers',
    description: 'Experienced and courteous chauffeurs',
    icon: <FaUserTie className="text-blue-500 text-3xl mb-4" />
  },
  {
    title: 'Safe Travel',
    description: 'Well-maintained vehicles for a secure journey',
    icon: <FaShieldAlt className="text-blue-500 text-3xl mb-4" />
  }
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Frequent Traveler',
    content: 'Excellent service! The drivers are always on time and the cars are spotless. Highly recommended for anyone looking for reliable cab services in Pune.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'Business Executive',
    content: 'I use MiCabs for all my business trips. Professional service and comfortable rides every time.',
    rating: 5
  },
  {
    name: 'Amit Deshmukh',
    role: 'Tourist',
    content: 'Booked a cab for a day trip to Lonavala. The driver was very knowledgeable about the area. Great experience!',
    rating: 4
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`} 
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  if (!isMounted) return null;

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
        // Close modal after successful submission
        setTimeout(() => {
          setIsBookingModalOpen(false);
        }, 2000); // Close after 2 seconds to allow user to see success message
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Pickup *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="pickup"
                    className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Pickup location"
                    value={formData.pickup}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Drop *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="drop"
                    className="w-full p-3 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Drop location"
                    value={formData.drop}
                    onChange={handleChange}
                    required
                  />
                </div>
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

  const stats = [
    { value: '3857+', label: 'Happy Customers' },
    { value: '8+', label: 'Years of Experience' },
    { value: '15+', label: 'Cabs Available' },
    { value: '7356+', label: 'Rides Completed' }
  ];

  // Cabs Fleet Data
  const cabs = [
    {
      brand: 'Micabs Pune',
      name: 'Swift Dzire',
      rate: '12 Rs/Km',
      fuel: 'CNG/DIESEL',
      seats: '4+1 Seater',
      ac: 'AC Available',
      image: '/images/cab1.jpg'
    },
    {
      brand: 'Micabs Pune',
      name: 'Ertiga',
      rate: '15 Rs/Km',
      fuel: 'CNG/DIESEL',
      seats: '6+1 Seater',
      ac: 'AC Available',
      image: '/images/cab2.jpg'
    },
    {
      brand: 'Micabs Pune',
      name: 'Etios',
      rate: '13 Rs/Km',
      fuel: 'CNG/DIESEL',
      seats: '4+1 Seater',
      ac: 'AC Available',
      image: '/images/cab3.jpg'
    },
    {
      brand: 'Micabs Pune',
      name: 'Kia Carens',
      rate: '19 Rs/Km',
      fuel: 'DIESEL',
      seats: '9+1 Seater',
      ac: 'AC Available',
      image: '/images/cab5.jpg'
    },
    {
      brand: 'Micabs Pune',
      name: 'Traveller',
      rate: 'Contact for Price',
      fuel: 'DIESEL',
      seats: '13/17/20 Seater',
      ac: 'AC Available',
      image: '/images/cab6.jpg'
    },
    {
      brand: 'Micabs Pune',
      name: 'Innova Crysta',
      rate: '20 Rs/Km',
      fuel: 'DIESEL',
      seats: '7+1 Seater',
      ac: 'AC Available',
      image: '/images/cab8.jpg'
    }
  ];

  // Our Cabs Fleet Section
  const renderCabsFleet = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cabs Fleet</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="mx-4 text-blue-600">
              <FaCar className="text-2xl" />
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from our well-maintained fleet of vehicles for a comfortable and safe journey
          </p>
        </div>

        {/* Cabs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cabs.map((cab, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-100 m-[10px]">
                <Image
                  src={cab.image}
                  alt={`${cab.name} - ${cab.brand}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-xs text-white/80">{cab.brand}</span>
                  <h3 className="text-xl font-bold text-white">{cab.name}</h3>
                </div>
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">{cab.rate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{cab.fuel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">{cab.seats}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">{cab.ac}</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Our Daily Services Section
  const renderDailyServices = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Daily Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience comfortable and reliable cab services for all your travel needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                  
                </div>
              </div>
              <div className="p-5 bg-white">
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const features = [
    { 
      icon: <FaTaxi className="text-4xl text-blue-900 mb-4" />,
      title: 'Cheapest Rates',
      description: 'M.I  CabServices in Pune Offers Cab in Pune at cheaper & Affordable Rates'
    },
    { 
      icon: <FaCar className="text-4xl text-blue-900 mb-4" />,
      title: 'Timetable Service',
      description: 'We are the only car rental services in Pune which provides timetable car rental services'
    },
    { 
      icon: <FaShuttleVan className="text-4xl text-blue-900 mb-4" />,
      title: 'Best Cabs',
      description: 'M.I  Taxi Services in Pune offers clean, new & Sanitized cabs on rent in Pune'
    },
    { 
      icon: <FaBus className="text-4xl text-blue-900 mb-4" />,
      title: 'Professional Chauffers',
      description: 'Our Car Rental Services in Pune provides car on rent with Professional Chauffers'
    }
  ];

  const cars = [
    {
      name: 'Swift Dzire',
      image: '/images/New1_dzire.jpg',
      rate: '12 Rs/Km',
      fuel: 'CNG/DIESEL',
      seats: '4+1 Seater',
      ac: 'Available'
    },
    {
      name: 'Ertiga',
      image: '/images/ertiga.jpg',
      rate: '15 Rs/Km',
      fuel: 'CNG/DIESEL',
      seats: '6+1 Seater',
      ac: 'Available'
    },
    {
      name: 'Innova',
      image: '/images/innova.jpg',
      rate: '19 Rs/Km',
      fuel: 'DIESEL',
      seats: '7+1 Seater',
      ac: 'Available'
    },
    {
      name: 'Innova Hycross',
      image: '/images/marazzo.jpg',
      rate: '25 Rs/Km',
      fuel: 'DIESEL',
      seats: '6+1 Seater',
      ac: 'Available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Premium Cab Services in <span className="text-yellow-400">Pune</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience comfortable, reliable, and safe rides across the city and beyond. Book your ride now!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/contact" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Book Now <FaArrowRight />
              </Link>
              <Link 
                href="tel:+918805051404" 
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPhoneAlt /> +91 8805051404
              </Link>
            </motion.div>
          </div>
        </div>
      </section> */}


      {/* Hero Section - Full Screen */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between w-full max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="lg:w-1/2 w-full max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight text-yellow-400">
                M.I  CABS PUNE
              </h1>
              
              <p className="text-lg mb-4 lg:mb-6 text-blue-100">
                Are you looking for cab services in Pune, then M.I Cabs is one of the best option for you. 
                Get all types of rental vehicles at economical and affordable rates. Get heavy discount on 
                advance booking of a cab for M.I  CABS Pune
              </p>
              
              <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg mb-4 lg:mb-6 border-l-4 border-yellow-500">
                <p className="font-bold text-lg mb-1">Special Discount On Pune Mumbai Cabs</p>
                <p className="text-sm">
                  M.I Cabs Pune offers special discount on booking of Pune Mumbai Cabs. 
                  Book a cab from Pune to Mumbai or Mumbai to Pune and get cabs at affordable rates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 w-full sm:w-auto">
                  Call Us Now
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 w-full sm:w-auto">
                  Book Your Ride
                </button>
              </div>
            </div>
            
            {/* Booking Form */}
            <div id="booking-form" className="lg:w-2/5 w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">Book Your Ride</h2>
                <p className="text-xs text-gray-500 mb-4 text-center">Note: Date format is DD/MM/YYYY (e.g., 25/12/2023)</p>
                <form onSubmit={handleSubmit} className="space-y-3">
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
                        <option value="oneway" className="text-gray-900">One Way</option>
                        <option value="round" className="text-gray-900">Round Trip</option>
                        <option value="local" className="text-gray-900">Rental</option>
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
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Popular Routes</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the best destinations with our reliable and comfortable cab services
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                variants={fadeInUp}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    {/* <p className="text-blue-100 text-sm">{service.description}</p> */}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    {/* <span className="text-gray-600">From ₹2,500</span> */}
                    <Link 
                      href="/contact" 
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      Book Now <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


       <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cabs Fleet</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our well-maintained fleet of vehicles for a comfortable journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Swift Dzire */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/New1_dzire.jpg" 
                  alt="Swift Dzire" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Dzire</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">13 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">CNG/DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">4+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Ertiga */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/Ertiga.jpeg" 
                  alt="Ertiga" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ertiga</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">15 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">CNG/DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">6+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Etios */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/Etios.jpeg" 
                  alt="Etios" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Etios</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">14 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">CNG/DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">4+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Innova */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/Innova_simple.jpg" 
                  alt="Innova" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innova</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">20 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">6+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Kia Carens */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/New_5.jpg" 
                  alt="Kia Carens" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kia Carens</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">19 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">9+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Traveller */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/Traveller.jpeg" 
                  alt="Traveller" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Traveller</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">Contact Us</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">13/17/20 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Innova Hycross */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/Innova_Hycross.jpg" 
                  alt="Innova Hycross" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innova Hycross</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">25 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">6+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Innova Crysta */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/New_8.jpg" 
                  alt="Innova Crysta" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innova Crysta</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">21 Rs/Km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">DIESEL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seating</p>
                    <p className="font-semibold">7+1 Seater</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AC</p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
                <button 
                  onClick={openBookingModal}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      {/* <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the best cab service experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* Testimonials Section */}
      
      
      {/* Hero Section with Booking Form */}
      {/* Our Daily Services Section */}
      {renderDailyServices()}

      {/* Our Cabs Fleet Section */}
      

      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium cab services for all your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Card 1 - Airport Transfer */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/service1.jpg" 
                  alt="Airport Transfer" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Airport Transfer</h3>
                <p className="text-gray-600 text-sm">Hassle-free airport pickups and drops</p>
              </div>
            </div>

            {/* Service Card 2 - City Rides */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/service2.jpg" 
                  alt="City Rides" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">City Rides</h3>
                <p className="text-gray-600 text-sm">Comfortable rides within the city</p>
              </div>
            </div>

            {/* Service Card 3 - Outstation */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/service3.jpg" 
                  alt="Outstation Trips" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Outstation Trips</h3>
                <p className="text-gray-600 text-sm">Long distance travel made comfortable</p>
              </div>
            </div>

            {/* Service Card 4 - Corporate Travel */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/service4.jpg" 
                  alt="Corporate Travel" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate Travel</h3>
                <p className="text-gray-600 text-sm">Professional travel solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Taxi Showcase */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pet Taxi Service</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Safe, comfortable, and stress-free transportation for your furry friends
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/dog1.jpg" 
                alt="Happy dog in car" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Safe Travel</h3>
              </div>
            </div>
            
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/dog2.jpg" 
                alt="Dog enjoying the ride" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Comfort Guaranteed</h3>
              </div>
            </div>
            
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/dog3.jpg" 
                alt="Pet taxi service" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">Professional Care</h3>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/pet-taxi" 
              className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Learn More About Pet Taxi <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium cab services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaMoneyBillWave className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cheapest Rates</h3>
              <p className="text-gray-600">M.I  CabServices in Pune offers cab in Pune at cheaper & affordable rates.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaClock className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Timetable Service</h3>
              <p className="text-gray-600">We are the only car rental services in Pune which provides timetable car rental services.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaTaxi className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Cabs</h3>
              <p className="text-gray-600">M.I  Taxi Services in Pune offers clean, new & sanitized cabs on rent in Pune.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaUserTie className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Chauffers</h3>
              <p className="text-gray-600">Our car rental services in Pune provide cabs with professional chauffers.</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaClock className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24Hrs Service</h3>
              <p className="text-gray-600">Our taxi in Pune is available 24×7 which makes us stand out from others.</p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Feel Like A Family</h3>
              <p className="text-gray-600">In our entire service we give you a feel like a family member for a better travel experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-10">
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Get connected with us for a hassle-free journey</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mt-8">
            <a 
              href="tel:+918805051404" 
              className="flex items-center justify-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 w-full md:w-auto"
            >
              <FaPhoneAlt className="mr-2" /> +91 8805051404
            </a>
            <a 
              href="mailto:micabspune@gmail.com" 
              className="flex items-center justify-center bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 w-full md:w-auto"
            >
              <FaEnvelope className="mr-2" /> micabspune@gmail.com
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>Deccan, Pune</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     

    <WhatsAppButton />
    <ContactUsToggle />
    
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
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
    )}
  </div>
  );
}
