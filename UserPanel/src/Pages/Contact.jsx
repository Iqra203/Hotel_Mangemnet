import React from 'react';
import Header from '../comA/Header';
import Footer from '../comA/Footer';
import { Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full">
      <Header />

      {/* Hero Section */}
      <div
        className="relative h-[90vh] bg-cover bg-center text-white text-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/302831/pexels-photo-302831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.5, filter: 'blur(4px)' }}></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col z-10 px-4">   <h1
  className="text-7xl font-extrabold text-white"
  style={{
    textShadow: "2px 2px 4px rgba(0,0,0,0.9)"
  }}
>
CONTACT US
</h1>          <p className="text-xl font-light max-w-xl italic drop-shadow-md">
            Discover our world and contact us for any questions or concerns.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white p-10 md:p-16 space-y-6">
          <div>
                Luxury Stay Hospitality
            <h2 className="text-3xl font-semibold mb-2">Contact us</h2>
            
            <p className="text-gray-500">We're open for any suggestion or just to have a chat</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-bold uppercase text-xs mb-1">Address:</p>
              <p>Aptech North Nazimabad Block D </p>
            </div>
            <div>
              <p className="font-bold uppercase text-xs mb-1">Email:</p>
              <p>LuxruyStay@gmail.com</p>
            </div>
            <div>
              <p className="font-bold uppercase text-xs mb-1">Phone:</p>
              <p>021-36630102-03</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <textarea
              placeholder="Create a message here"
              className="w-full border-b border-gray-300 py-2 focus:outline-none resize-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded font-medium flex items-center gap-2 hover:bg-orange-600 hover:scale-105 transform transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <Send size={16} /> Send Message
            </button>
          </form>

          <div className="mt-6">
  <p className="text-sm font-medium">Follow us here</p>
  <div className="flex gap-4 text-lg text-gray-700 mt-2">
    <a href="#" className="hover:text-blue-500 transition-colors duration-200">
  <FaFacebookF />
</a>
    <a href="#"  className="hover:text-blue-500 transition-colors duration-200">
      <FaTwitter />
    </a>
    <a href="#"  className="hover:text-purple-500 transition-colors duration-200">
      <FaInstagram />
    </a>
    <a href="#"  className="hover:text-green-500 transition-colors duration-200">
      <FaWhatsapp />
    </a>
  </div>

          </div>
        </div>

        {/* Google Map */}
        <div className="bg-gray-100 p-6">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7236570317714!2d-74.00772968459321!3d40.71277597933005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1615585487997!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '100%' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
