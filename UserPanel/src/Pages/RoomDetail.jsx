import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../comA/Header";
import Footer from "../comA/Footer";
import Carousal from "../components/layout/Caruosel";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading room details...</div>;
  }

  if (!room) {
    return <div className="text-center mt-20 text-xl">Room not found.</div>;
  }

  return (
    <>
      <Header />
      <Carousal />

      <div className="max-w-5xl mx-auto mt-10 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1 text-gray-700 font-medium hover:text-orange-500 hover:underline transition-all duration-200"
        >
          ← Back to rooms
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={`http://localhost:5000/uploads/${room.image}`}
            alt={room.type}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">{room.type}</h2>
            <p className="text-xl text-gray-700 mb-2">${room.price} / night</p>
            <p className="text-gray-600 leading-relaxed mb-4">{room.desc}</p>

            <div className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  room.status === "Vacant"
                    ? "text-green-600"
                    : room.status === "Occupied"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {room.status}
              </span>
            </div>

            <div className="mb-4">
              <strong>Availability:</strong>{" "}
              <span className={room.availability ? "text-green-600" : "text-red-500"}>
                {room.availability ? "Available" : "Not Available"}
              </span>
            </div>

            {!room.availability && (
              <p className="text-red-500 font-semibold mb-3">
                Sorry! This room is currently not available for booking.
              </p>
            )}

            {/* Buttons aligned horizontally */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  navigate(`/booking`, {
                    state: {
                      roomId: room._id,
                      roomType: room.type,
                      roomPrice: room.price,
                      roomStatus: room.status
                    }
                  })
                }
                disabled={!room.availability}
                className={`px-5 py-2 rounded-lg font-medium transition-transform duration-200 shadow-md ${
                  room.availability
                    ? "bg-[#FF8904] text-white hover:bg-[#e67600] hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>

              <button
  onClick={() =>
    navigate(`/userMaintenance`, {
      state: {
        roomNumber: room.type || room._id,
      },
    })
  }
  className="px-5 py-2 rounded-lg font-medium transition-transform duration-200 shadow-md bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
>
  Request Maintenance
</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RoomDetail;
