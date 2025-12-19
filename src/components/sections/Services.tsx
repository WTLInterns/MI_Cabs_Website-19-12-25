import { FaTaxi, FaPlane, FaCar, FaDog, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

const services = [
  {
    icon: <FaTaxi className="text-4xl text-yellow-500 mb-4" />,
    title: "Local Rides",
    description: "Comfortable rides within the city for all your daily commutes."
  },
  {
    icon: <FaPlane className="text-4xl text-yellow-500 mb-4" />,
    title: "Airport Transfers",
    description: "On-time airport pickups and drop-offs with flight tracking."
  },
  {
    icon: <FaCar className="text-4xl text-yellow-500 mb-4" />,
    title: "Outstation Rides",
    description: "Reliable long-distance travel to any destination."
  },
  {
    icon: <FaDog className="text-4xl text-yellow-500 mb-4" />,
    title: "Pet Taxi",
    description: "Safe and comfortable transportation for your furry friends."
  },
  {
    icon: <FaBriefcase className="text-4xl text-yellow-500 mb-4" />,
    title: "Corporate Rides",
    description: "Professional transportation services for business needs."
  },
  {
    icon: <FaMapMarkerAlt className="text-4xl text-yellow-500 mb-4" />,
    title: "City Tours",
    description: "Explore the city with our knowledgeable drivers."
  }
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of transportation services to meet all your travel needs in and around Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full transition-colors">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
