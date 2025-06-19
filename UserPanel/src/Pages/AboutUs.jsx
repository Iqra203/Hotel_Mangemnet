import React from "react";
import Header from "../comA/Header";
import Footer from "../comA/Footer";

const AboutUs = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
         
          <h1
  className="text-7xl font-extrabold text-white"
  style={{
    textShadow: "2px 2px 4px rgba(0,0,0,0.9)"
  }}
>
Luxury Stay Hospitality
</h1>

          <p className="text-sl md:text-2xl italic">
          "Discover timeless elegance and unmatched comfort at the heart of your perfect getaway."
          </p>
        </div>
      </div>

      {/* Main About Content */}
      <div className="px-6 md:px-20 py-10 space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-serif font-semibold mb-2">About Us</h1>
        </div>

        {/* Welcome Section with Background */}
        <div
          className="relative flex flex-col md:flex-row items-start justify-between gap-10 p-10 rounded-2xl bg-cover bg-center bg-no-repeat text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl z-0"></div>

          <div className="relative z-10 flex-1">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Welcome to Sona
            </h2>
            <p className="leading-relaxed">
              In the beginning, serenity bloomed where time stood still. Shadows gave way to light, and waters gathered under skies rich with promise. Sona was born from this harmony — a sanctuary where elegance breathes, the evening whispers, and every detail bears the mark of timeless grace.
            </p>
          </div>

          <ul className="relative z-10 flex-1 space-y-3">
            <li>✔️ 20% off on luxurious accommodations</li>
            <li>✔️ Daily complimentary breakfast</li>
            <li>✔️ Three complimentary laundry items per day</li>
            <li>✔️ High-speed Wi-Fi access</li>
            <li>✔️ 20% discount on food & beverages</li>
          </ul>
        </div>

        {/* Discover Our Work */}
        <div>
          <h2 className="text-center text-3xl md:text-4xl font-serif font-semibold mb-10">
            Experience Our Craftsmanship
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                src: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: "Room Luxury",
                span: "col-span-2 md:col-span-1",
                height: "h-64",
              },
              {
                src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=compress&cs=tinysrgb&w=1080",
                alt: "Lobby",
                span: "col-span-2 md:col-span-2",
                height: "h-64",
              },
              {
                src: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: "Stairs",
                span: "",
                height: "h-48",
              },
              {
                src: "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: "Bed Room",
                span: "",
                height: "h-48",
              },
              {
                src: "https://images.pexels.com/photos/27548238/pexels-photo-27548238/free-photo-of-the-lobby-of-a-hotel-with-blue-couches-and-a-chandelier.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: "Lobby Area",
                span: "col-span-2 md:col-span-1",
                height: "h-48",
              },
            ].map((img, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl group ${img.height} w-full ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-80 transition duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <span className="text-white text-xl md:text-2xl font-semibold">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
