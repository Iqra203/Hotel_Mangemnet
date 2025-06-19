import React from 'react';

const ResidenceSection = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white p-8">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full h-96 lg:h-auto mb-8 lg:mb-0">
        <img 
          src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with your image path
          alt="Residence" 
          className="w-full h-full object-cover rounded-lg shadow-xl"
        />
      </div>

      {/* Text Content Section */}
      <div className="lg:w-1/2 w-full max-w-2xl lg:pl-16 space-y-8">
        <h1 className="text-4xl font-bold  font-serif text-gray-800 mb-6">
          Welcome to our residence
        </h1>
        
        <div className="space-y-6">
          <p className="text-lg font-serif text-gray-600 leading-relaxed">
            Beginning blessed second a creepeth. Darkness wherein fish years good air whose after seed appear midst evenin, appear void give third bearing divide one so blessed moved firmament gathered
          </p>
          
          <p className="text-lg font-serif text-gray-600 leading-relaxed">
            Beginning blessed second a creepeth. Darkness wherein fish years good air whose after seed appear midst evenin, appear void give third bearing divide one so blessed
          </p>
        </div>

        <hr className="border-t-2 border-gray-300 w-24 my-8" />

        <button className="bg-transparent hover:bg-orange-400 text-w-800 font-semibold hover:text-white py-3 px-8 border-2 border-gray-800 hover:border-transparent transition duration-300 uppercase">
          LEARN MORE
        </button>
      </div>
    
    </section>
  );
};

export default ResidenceSection;