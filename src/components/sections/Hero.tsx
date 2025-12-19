import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-blue-900 text-white py-16 md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Reliable & Affordable Cab Services in Pune
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Experience comfortable and safe rides with our professional drivers. 
            Available 24/7 for all your transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/booking" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-full text-center transition-colors text-lg"
            >
              Book a Ride Now
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent hover:bg-blue-800 text-white font-semibold py-3 px-8 border-2 border-white rounded-full text-center transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
