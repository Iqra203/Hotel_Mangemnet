import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-12">
      {/* Title & Tagline */}
      <div className="text-center mb-10">
        <h2 className="inline-block text-3xl font-bold tracking-wide border border-gray-800 px-5 py-2 rounded-lg shadow-sm">
          LuxuryStay Hospitality
        </h2>
        <p className="text-sm text-gray-600 mt-2 italic">Since 2025</p>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-700">
        
        {/* Address */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Our Address</h3>
          <p>Aptech Block D North Nazimabad Town, Karachi
 </p>
          <p>021-36630102-03</p>
          <p>Pakistan</p>
        </div>

        {/* Reservations */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Reservations</h3>
          <p>Tel: 021-36630102-03</p>
          <p>Fax: 021-36630102-03</p>
          <p className="text-blue-600 hover:underline cursor-pointer">
          LuxruyStay@gmail.com
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Newsletter</h3>
          <input
            type="email"
            placeholder="Your email address"
            className="border-b border-gray-600 w-full py-2 px-1 mb-4 bg-transparent focus:outline-none focus:border-black"
          />
          <button
            className="bg-orange-400 text-white px-5 py-2 rounded font-medium flex items-center gap-2 hover:bg-orange-600 hover:scale-105 transform transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <Mail size={16} /> Subscribe
          </button>
        </div>

        {/* Awards / Social */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Our Recognition</h3>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/YourAwardPage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JVQ0J749gXD7uexYnaksVe-gcs9yxn-iL9unLS5PYPD8xk351cPdEU9FEIGFW64IcNc&usqp=CAU"
                alt="Award"
                className="h-16 rounded shadow-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12">
        <p className="text-xs text-gray-500">
          © 2025 LuxuryStay Hospitality. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
