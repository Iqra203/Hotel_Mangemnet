import { useState } from 'react';

const HoverScrollCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // ऑनलाइन इमेज URLs
  const PARTIES_IMAGES = [
    'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/14036254/pexels-photo-14036254.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

 
  const images = [...PARTIES_IMAGES, ...PARTIES_IMAGES];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold font-serif text-gray-800 mb-8 text-center">
        Visual Tales of Comfort and Luxury
      </h2>
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`flex gap-8 ${isHovered ? 'animate-scroll' : ''}`}
          style={{ 
            width: `${images.length * 25}%`,
            animation: 'scroll 20s linear infinite'
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-64">
              <img
                src={img}
                alt={`Event ${index}`}
                className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
            animation-play-state: ${isHovered ? 'running' : 'paused'};
          }
        `}</style>
      </div>
    </div>
  );
};

export default HoverScrollCarousel;