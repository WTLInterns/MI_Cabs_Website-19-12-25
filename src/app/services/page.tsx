"use client";

import Image from 'next/image';
import { FaPlane, FaMountain, FaRoute, FaGlassCheers, FaCar, FaFacebook, FaInstagram, FaPaw, FaShieldAlt, FaHandsHelping } from 'react-icons/fa';

export default function ServicesPage() {
  const services = [
    {
      icon: <FaPlane className="text-5xl text-blue-900 mb-4" />,
      title: "Airport Pickup and Drop",
      description: "MI CABS offers a reliable and convenient Airport Service for travelers to and from various airports. Whether you are arriving at or departing from the airport, MI CABS ensures a smooth and hassle-free journey for its customers.",
      features: [
        "Prompt Airport Pickup and Drop-off",
        "Wide Range of Vehicle Options",
        "Experienced and Courteous Drivers",
        "Comfortable and Well-Maintained Vehicles",
        "24/7 Availability",
        "Easy Booking and Payment",
        "Competitive Pricing"
      ]
    },
    {
      icon: <FaMountain className="text-5xl text-blue-900 mb-4" />,
      title: "Hillstation Packages",
      description: "Experience the breathtaking beauty of nature with MI CABS Hillstation Package. Our specially crafted packages are designed to offer you an unforgettable journey through some of the most picturesque hill stations in the country.",
      features: [
        "Diverse range of hill station destinations",
        "Customizable packages",
        "Comfortable and safe travel",
        "Experienced drivers familiar with hilly terrains",
        "Flexible itineraries"
      ]
    },
    {
      icon: <FaRoute className="text-5xl text-blue-900 mb-4" />,
      title: "Outstation Booking",
      description: "MI CABS offers Outstation Booking services that allow you to plan and book comfortable transportation for your trips outside the city. Whether you are looking for a weekend getaway, a family vacation, or a business trip, MI CABS ensures a seamless and enjoyable journey to your desired destination.",
      features: [
        "Wide Range of Vehicles",
        "Professional and Experienced Drivers",
        "Flexible Booking Options",
        "Transparent Pricing",
        "Comfort and Convenience",
        "Customized Travel Plans",
        "24/7 Customer Support"
      ]
    },
    {
      icon: <FaGlassCheers className="text-5xl text-blue-900 mb-4" />,
      title: "Marriage Occasion",
      description: "Make your special day even more memorable with our wedding transportation services. We provide luxurious and elegant cars to add a touch of grandeur to your marriage occasion.",
      features: [
        "Luxury fleet for wedding parties",
        "Professional chauffeurs",
        "On-time service",
        "Decorated vehicles",
        "Flexible packages"
      ]
    },
    {
      icon: <FaPaw className="text-5xl text-blue-900 mb-4" />,
      title: "Pet Taxi",
      description: "Our pet taxi service provides safe, comfortable, and stress-free transportation for your furry friends. Whether it's a trip to the vet, groomer, or a fun day out, we ensure your pet travels in comfort and style.",
      features: [
        "Expertise & Experience",
        "Personalized Service",
        "Safety & Comfort"
      ]
    }
  ];

  const fleet = [
    {
      name: "Swift Dzire",
      type: "4+1 Seater",
      rate: "13 Rs/Km",
      fuel: "CNG/PETROL",
      ac: "Available"
    },
    {
      name: "Ertiga",
      type: "6+1 Seater",
      rate: "14 Rs/Km",
      fuel: "CNG/DIESEL",
      ac: "Available"
    },
    {
      name: "Etios",
      type: "4+1 Seater",
      rate: "14 Rs/Km",
      fuel: "CNG/DIESEL",
      ac: "Available"
    },
    {
      name: "Innova",
      type: "6+1 Seater",
      rate: "20 Rs/Km",
      fuel: "DIESEL",
      ac: "Available"
    },
    {
      name: "Kia Carens",
      type: "6+1 Seater",
      rate: "18 Rs/Km",
      fuel: "DIESEL",
      ac: "Available"
    },
    {
      name: "Traveller",
      type: "13-17-20 Seater",
      rate: "Contact for pricing",
      fuel: "DIESEL",
      ac: "Available"
    },
    {
      name: "Innova Hycross",
      type: "6+1 Seater",
      rate: "25 Rs/Km",
      fuel: "PETROL-AUTOMATIC",
      ac: "Available"
    },
    {
      name: "Innova Crysta",
      type: "7+1 Seater",
      rate: "21 Rs/Km",
      fuel: "DIESEL",
      ac: "Available"
    }
  ];

  // Pet Taxi section has been moved to /pet-taxi page

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience premium transportation services tailored to your needs
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-center">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <h3 className="font-semibold text-lg mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                  <a 
                    href="/pet-taxi" 
                    className="block w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-full text-center transition-colors"
                  >
                    {service.title === "Pet Taxi" ? 'Learn More' : 'Book Now'}
                  </a>
                </div>
              </div>
            ))}
          </div>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition duration-300">
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Innova Hycross</h3>
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
                      <span className="text-xs text-gray-500">MI CABS Pune</span>
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

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About MI CABS Pune</h2>
            <p className="text-lg text-gray-700 mb-8">
              MI CABS Pune is a car rental company which provides cars on rent in Pune at cheaper and affordable rates. 
              As a leading car rental company in Pune, we provide special discounts and premium services to ensure 
              your travel experience is comfortable and hassle-free.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-900 hover:text-blue-700">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-blue-900 hover:text-blue-700">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}