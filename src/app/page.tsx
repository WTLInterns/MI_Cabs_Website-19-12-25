"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FaTaxi, FaCar, FaShuttleVan, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaMoneyBillWave, FaClock, FaUserTie, FaShieldAlt, FaArrowRight, FaBus } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    title: 'Trimbakeshwar',
    image: '/images/Trambakeshwar.jpeg',
    description: 'Pilgrimage tours to the sacred Trimbakeshwar Temple',
    icon: <FaMapMarkerAlt className="text-blue-500 text-2xl" />
  },
  {
    title: 'Lavasa',
    image: '/images/Lawasa.jpeg',
    description: 'Scenic drives to the beautiful hill station',
    icon: <FaCar className="text-blue-500 text-2xl" />
  },
  {
    title: 'Mumbai',
    image: '/images/Mumbai.jpeg',
    description: 'Comfortable rides to the city of dreams',
    icon: <FaTaxi className="text-blue-500 text-2xl" />
  },
  {
    title: 'Mahabaleshwar',
    image: '/images/Mahableshwar.jpeg',
    description: 'Picturesque journeys to the queen of hill stations',
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

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const [formData, setFormData] = useState({
    tripType: 'oneway',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const renderFormFields = () => {
    switch (formData.tripType) {
      case 'oneway':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Pickup *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="pickup"
                    className="w-full p-2 pl-7 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Pickup location"
                    value={formData.pickup}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Drop *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="drop"
                    className="w-full p-2 pl-7 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Drop location"
                    value={formData.drop}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Pickup Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="pickup"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Return Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="returnDate"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Return Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="returnTime"
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Pickup Location *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="pickup"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter pickup location"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pickup Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Number of Days *</label>
              <select 
                name="rentalDays"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      name: 'Tavera',
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
              <div className="relative h-48 bg-gray-100">
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
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
      description: 'M.I Cab Services in Pune Offers Cab in Pune at cheaper & Affordable Rates'
    },
    { 
      icon: <FaCar className="text-4xl text-blue-900 mb-4" />,
      title: 'Timetable Service',
      description: 'We are the only car rental services in Pune which provides timetable car rental services'
    },
    { 
      icon: <FaShuttleVan className="text-4xl text-blue-900 mb-4" />,
      title: 'Best Cabs',
      description: 'M.I Taxi Services in Pune offers clean, new & Sanitized cabs on rent in Pune'
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
      image: '/images/swift-dzire.jpg',
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
      name: 'Mahindra Marazzo',
      image: '/images/marazzo.jpg',
      rate: '16 Rs/Km',
      fuel: 'DIESEL',
      seats: '6+1 Seater',
      ac: 'Available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32 overflow-hidden">
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
      </section>
      
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
                    <p className="text-blue-100 text-sm">{service.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">From ₹2,500</span>
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
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
      </section>
      
      {/* Testimonials Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Next Ride?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Experience the best cab service in Pune. Book now and enjoy a comfortable journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Book Now <FaArrowRight />
              </Link>
              <a 
                href="tel:+918805051404" 
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPhoneAlt /> +91 8805051404
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Hero Section with Booking Form */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                M.I CABS PUNE
              </h1>
              <p className="text-lg mb-6 text-blue-100">
                Are you looking for cab services in Pune, then M.I Cabs is one of the best option for you. 
                Get all types of rental vehicles at economical and affordable rates. Get heavy discount on 
                advance booking of a cab for M.I Cabs Pune
              </p>
              
              <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
                <p className="font-bold text-lg mb-1">Special Discount On Pune Mumbai Cabs</p>
                <p className="text-sm">
                  MI Cabs Pune offers special discount on booking of Pune Mumbai Cabs. 
                  Book a cab from Pune to Mumbai or Mumbai to Pune and get cabs at affordable rates.
                </p>
              </div>
              
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300">
                Call Us Now
              </button>
            </div>
            
            {/* Booking Form */}
            <div className="lg:w-1/2 bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 sm:p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Book Your Ride</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Choose Type Of Trip *</label>
                    <div className="relative">
                      <select 
                        name="tripType"
                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.tripType}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select trip type</option>
                        <option value="oneway" className="text-gray-900">Oneway Trip</option>
                        <option value="round" className="text-gray-900">Round Trip</option>
                        <option value="local" className="text-gray-900">Rental Trip</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {renderFormFields()}
                  
                  {/* Contact Information */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">Email *</label>
                          <div className="relative">
                            <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                            <input
                              type="email"
                              name="email"
                              className="w-full p-2 pl-7 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">Phone *</label>
                          <div className="relative">
                            <FaPhoneAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                            <input
                              type="tel"
                              name="phone"
                              className="w-full p-2 pl-7 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Message (Optional)</label>
                      <textarea
                        name="message"
                        rows={1}
                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Special requirements?"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-1.5 px-4 rounded-lg transition duration-300 text-sm"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Daily Services Section */}
      {renderDailyServices()}

      {/* Our Cabs Fleet Section */}
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
                  src="/images/swift-dzire.jpg" 
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
                    <p className="font-semibold text-blue-900">12 Rs/Km</p>
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Ertiga */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/ertiga.jpg" 
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Etios */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/etios.jpg" 
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Innova */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/innova.jpg" 
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
                    <p className="font-semibold text-blue-900">19 Rs/Km</p>
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Tavera */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/tavera.jpg" 
                  alt="Tavera" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tavera</h3>
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Traveller */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/traveller.jpg" 
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Marazzo */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/marazzo.jpg" 
                  alt="Marazzo" 
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-500">Micabs Pune</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Marazzo</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fare Rate</p>
                    <p className="font-semibold text-blue-900">16 Rs/Km</p>
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Innova Crysta */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src="/images/innova-crysta.jpg" 
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
                    <p className="font-semibold text-blue-900">20 Rs/Km</p>
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
                <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.value}</div>
              </div>
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
              <p className="text-gray-600">M.I Cab Services in Pune offers cab in Pune at cheaper & affordable rates.</p>
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
              <p className="text-gray-600">M.I Taxi Services in Pune offers clean, new & sanitized cabs on rent in Pune.</p>
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
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to book your ride?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Download our app or book online for the best rates and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92v-18.53a1 1 0 01.609-.922zm14.575 9.186a.997.997 0 010 1.086l-1.5 2.598a.5.5 0 01-.433.25h-3.5v-8h3.5a.5.5 0 01.433.25l1.5 2.598z"/>
                <path d="M18.25 7.5h-3.5v9h3.5a.5.5 0 00.5-.5V8a.5.5 0 00-.5-.5z"/>
              </svg>
              Download for Android
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3 .08a11.54 11.54 0 01-3.5-3.13c-1.72-2.68-1.35-5.2-.14-5.78 1.6-.76 2.2-2.6 1.96-4.08-.2-1.25-1.3-2.4-2.84-2.7-1.88-.38-3.24.2-4.28.67.1-.63.2-1.24.3-1.86.18-1.03.36-2.09-.08-2.9-.23-.42-.6-.8-1.1-.8H2.3c-.23 0-.43.1-.57.27-.14.17-.2.4-.16.64C2.5 8.7 5.2 20.2 5.22 20.3c.06.3.2.6.42.83.2.23.48.36.77.36h3.44c.5 0 .9-.4.9-.9 0-.1 0-.2-.03-.3l-.9-5.62c1.7 2.6 4.3 5.2 6.5 6.3.5.2 1.1.2 1.6 0 .6-.3 1.1-.7 1.5-1.1.3-.3.2-.8-.2-1.1z"/>
                <path d="M12.08 5.5c0 .7-.2 1.3-.5 1.9-.5.8-1.2 1.5-2.1 1.7-.1 0-.2.1-.3.1-.6 0-1.2-.5-1.2-1.2 0-.5.3-1 .7-1.4.5-.5 1.2-.8 1.9-.8h.5c.6 0 1 .5 1 1.7z"/>
              </svg>
              Download for iOS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
