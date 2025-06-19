// RoomFeatures.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Header from "../comA/Header";
import Carousal from "../components/layout/Caruosel";
import Footer from "../comA/Footer";

const RoomFeatures = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Header />
      <Carousal />

      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-10">Our Rooms</h2>
        <div className="max-w-6xl mx-auto px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room._id}>
                <div
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={`http://localhost:5000/uploads/${room.image}`}
                    alt={room.type}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 text-left">
                    <h4 className="text-xl font-semibold mb-2">{room.type}</h4>
                    <p className="text-gray-600">${room.price} / night</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RoomFeatures;
