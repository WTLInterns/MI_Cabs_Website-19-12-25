"use client";

import { FaPaw, FaShieldAlt, FaHandsHelping, FaPhoneAlt, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export default function PetTaxiPage() {
  const sliderRef = useRef<Slider>(null);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    cssEase: 'ease-in-out'
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const slides = [
    { src: "/images/dog1.jpg", alt: "Happy dog in car" },
    { src: "/images/dog2.jpg", alt: "Dog enjoying the ride" },
    { src: "/images/dog3.jpg", alt: "Pet taxi service" }
  ];

  const features = [
    {
      icon: <FaPaw className="text-5xl text-white mb-4" />,
      title: "Expertise & Experience",
      description: "Our team of pet-loving professionals has years of experience in pet transportation, ensuring your pet's safety and comfort throughout the journey."
    },
    {
      icon: <FaHandsHelping className="text-5xl text-white mb-4" />,
      title: "Personalized Service",
      description: "We understand that every pet is unique. Our services are tailored to meet the specific needs of your furry friend, whether they're a puppy, senior, or have special requirements."
    },
    {
      icon: <FaShieldAlt className="text-5xl text-white mb-4" />,
      title: "Safety & Comfort",
      description: "Your pet's safety is our top priority. Our vehicles are equipped with secure crates, climate control, and all necessary amenities to ensure a stress-free journey."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">Pet's Travel Companion</h1>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
        
        <Slider ref={sliderRef} {...sliderSettings} className="h-full">
          {slides.map((slide, index) => (
            <div key={index} className="h-full">
              <div className="h-full w-full flex items-center justify-center relative">
                <Image 
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Info Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Take Your Pets Wherever They Need to Go</h2>
            <p className="text-lg md:text-xl mb-12 text-blue-100">
              Our pet taxi service provides safe, comfortable, and stress-free transportation for your furry friends. 
              Whether it's a trip to the vet, groomer, or a fun day out, we ensure your pet travels in comfort and style.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-blue-800 rounded-lg hover:bg-blue-700 transition duration-300">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Ready to Book a Ride for Your Pet?</h3>
              <p className="mb-8 text-blue-100">
                Contact us today to schedule your pet's next journey with our reliable and caring pet taxi service.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="tel:+918805051404" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-lg text-center transition duration-300"
                >
                  <FaPhoneAlt className="inline mr-2" /> Call Now: +91 8805051404
                </a>
                <a 
                  href="mailto:micabspune@gmail.com" 
                  className="bg-transparent hover:bg-blue-800 text-white font-semibold py-3 px-8 border-2 border-white rounded-lg text-center transition duration-300"
                >
                  <FaEnvelope className="inline mr-2" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Pet Taxi Service?</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Safe and Secure Transport</h3>
                <p className="text-gray-700">
                  Our vehicles are equipped with secure crates and safety harnesses to ensure your pet travels safely. 
                  We follow all safety protocols to provide a secure environment for your pet during transit.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Professional Pet Handlers</h3>
                <p className="text-gray-700">
                  Our team consists of trained professionals who understand animal behavior and know how to handle pets 
                  with care and compassion, ensuring a stress-free experience for your furry friend.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
                <p className="text-gray-700">
                  We offer flexible scheduling to accommodate your pet's needs, whether it's a one-time ride or regular 
                  transportation for vet visits, grooming, or other appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
