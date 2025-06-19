import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const images = [
  "https://images.pexels.com/photos/751268/pexels-photo-751268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/68438/pexels-photo-68438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2883047/pexels-photo-2883047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

const Carousal = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const handleRoomClick = () => {
    navigate('/roomf');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[current]})`,
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* overlay  */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: 0.4, 
          filter: "blur(5px)",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
      <h1
  className="text-8xl font-extrabold text-white"
  style={{
    textShadow: "2px 2px 4px rgba(0,0,0,0.9)"
  }}
>
  A LUXURY STAY
</h1>


        <p className="mt-4 text-white max-w-2xl italic text-base md:text-lg lg:text-xl">
          Experience the comfort of a serene retreat with breathtaking views and premium hospitality.
        </p>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            className="bg-white text-gray-800 px-4 py-2 rounded"
            onClick={handleRoomClick} 
          >
            Room
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleBookingClick} // Book Now button
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
