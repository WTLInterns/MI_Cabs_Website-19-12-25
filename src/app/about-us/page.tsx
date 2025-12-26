"use client";

import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-28 bg-white">
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="text-center text-black px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About M.I  CABS</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <Image
                src="/images/AboutUs.jpg"
                alt="M.I  CABS"
                width={600}
                height={350}
                className="w-full h-auto rounded-lg shadow-lg mb-8"
              />
              <p className="text-gray-700 mb-6">
                Micabs offers a reliable and convenient Airport Service for travelers to and from various airports. 
                Whether you are arriving at or departing from the airport, Micabs ensures a smooth and hassle-free 
                journey for its customers. The Airport Service is designed to provide comfort, safety, and punctuality, 
                making it an ideal choice for business travelers, tourists, and anyone in need of transportation to or 
                from the airport.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Key Features of Micabs Airport Service:</h2>
              
              <h3 className="text-xl font-semibold mb-2 mt-6">Prompt Airport Pickup and Drop-off:</h3>
              <p className="text-gray-700 mb-4">
                Micabs understands the importance of time for travelers, and hence, they offer timely and prompt airport 
                pickups and drop-offs. Our professional drivers are well-versed with the airport routes and traffic 
                conditions, ensuring that you reach your destination on time.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Wide Range of Vehicle Options:</h3>
              <p className="text-gray-700 mb-4">
                Micabs provides a diverse fleet of vehicles to cater to the varying needs of passengers. From economy 
                cars for solo travelers to spacious vans for groups, customers can choose the vehicle that suits their 
                preferences and requirements.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Experienced and Courteous Drivers:</h3>
              <p className="text-gray-700 mb-4">
                Micabs takes pride in its team of experienced and courteous drivers who prioritize passenger safety and 
                comfort. They are trained to provide a high level of customer service and are well-mannered and polite.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Comfortable and Well-Maintained Vehicles:</h3>
              <p className="text-gray-700 mb-4">
                The vehicles used for the Airport Service are well-maintained and equipped with modern amenities to ensure 
                a comfortable ride. Whether you need to relax after a long flight or prepare for an important meeting, 
                Micabs vehicles offer a pleasant travel experience.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">24/7 Availability:</h3>
              <p className="text-gray-700 mb-4">
                Micabs Airport Service operates round the clock to accommodate early morning or late-night flights. 
                Regardless of the time of your flight, you can count on Micabs to be there for you.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Easy Booking and Payment:</h3>
              <p className="text-gray-700 mb-4">
                Booking the Airport Service with Micabs is simple and convenient. Customers can book their rides through 
                the Micabs website or mobile app. The payment process is secure and offers multiple options, including 
                cashless transactions.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing:</h3>
              <p className="text-gray-700 mb-8">
                Micabs is committed to offering competitive pricing for its Airport Service without compromising on quality. 
                Transparent fare policies ensure that customers get value for their money.
              </p>
              
              <p className="text-gray-700 mb-8">
                Whether you are a frequent traveler or visiting a new city for the first time, Micabs Airport Service 
                provides a reliable and stress-free transportation solution. With a strong emphasis on customer satisfaction 
                and a track record of providing excellent service, Micabs has become a trusted choice for airport 
                transportation among travelers.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">About M.I  CABS</h2>
              <p className="text-gray-700 mb-6">
                M.I  CABS is a leading cab company providing reliable transportation services across the beautiful state of 
                Maharashtra. With years of experience in the industry, we have established ourselves as a trusted name 
                among commuters seeking safe, comfortable, and affordable travel solutions.
              </p>
              
              <p className="text-gray-700 mb-6">
                Our mission at M.I  CABS is to offer seamless mobility experiences to our valued customers, ensuring they 
                reach their destinations on time and in style. Whether you are a resident of Maharashtra or a visitor 
                exploring the region, we are here to cater to all your travel needs with utmost professionalism and 
                efficiency.
              </p>
              
              <p className="text-gray-700 mb-6">
                What sets us apart is our extensive fleet of well-maintained vehicles that cater to different passenger 
                requirements. From elegant sedans for executive travel to spacious SUVs for family trips, we have the 
                right vehicle for every occasion. Our commitment to quality extends to our courteous and experienced 
                drivers who prioritize passenger safety and comfort above all else.
              </p>
              
              <p className="text-gray-700 mb-6">
                At M.I  CABS, we understand that punctuality is crucial, especially for travelers with busy schedules. 
                Hence, our drivers are well-versed with the roads of Maharashtra, ensuring that you reach your destination 
                on time, every time. Whether it's a quick airport transfer, a sightseeing tour, or a long-distance 
                journey, you can rely on M.I  CABS to deliver a smooth and hassle-free experience.
              </p>
              
              <p className="text-gray-700 mb-6">
                We take pride in our customer-centric approach, which has earned us a loyal clientele and numerous 
                positive reviews. Our 24/7 customer support team is always ready to assist you, be it for booking a ride, 
                addressing queries, or providing any necessary assistance during your journey with us.
              </p>
              
              <p className="text-gray-700">
                M.I  CABS is dedicated to contributing positively to the transportation landscape in Maharashtra, supporting 
                tourism, business, and personal travel needs. Whether you are exploring the bustling cities or the serene 
                countryside, we are here to make your journeys memorable and enjoyable.
              </p>
            </div>
            
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold mb-6">Book Your Next Ride with M.I  CABS</h2>
              <p className="text-black mb-8">
                Experience the epitome of safe, comfortable, and reliable cab services in Maharashtra.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}