import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../comA/Header";
import Footer from "../comA/Footer";
import Carousal from "../components/layout/Caruosel";
import axios from "axios";

const RoomDetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  // Check if the user is authenticated by checking a token in localStorage (or any other method you're using)
  useEffect(() => {
    const token = localStorage.getItem("token"); // or check your global auth context if using one
    if (!token) {
      // Redirect to login page if not authenticated
      navigate("/signUp");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        if (response.status === 200) {
          setRoom(response.data);
        } else {
          throw new Error("Room not found.");
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        setError(error.message || "An error occurred while fetching room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, isAuthenticated]);

  const handleCheckIn = () => {
    navigate("/checkin", {
      state: {
        roomId: room._id,
        roomType: room.type,
        roomPrice: room.price
      }
    });
  };

  const handleCheckOut = () => {
    navigate("/checkout", {
      state: {
        roomId: room._id,
        roomType: room.type
      }
    });
  };

  const handleReportIssue = () => {
    navigate("/maintenance-request", {
      state: {
        roomId: room._id,
        roomType: room.type
      }
    });
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading room details...</div>;
  if (error) return <div className="text-center mt-20 text-xl text-red-600">{error}</div>;
  if (!room) return <div className="text-center mt-20 text-xl">Room not found.</div>;

  return (
    <>
      <Header />
      <Carousal />
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <button onClick={() => navigate(-1)} className="mb-6 text-gray-700 hover:underline">← Back</button>

        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={`http://localhost:5000/uploads/${room.image}`}
            alt={room.type}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">{room.type}</h2>
            <p className="text-xl text-gray-700 mb-2">${room.price} / night</p>
            <p className="text-gray-600 mb-4">{room.desc}</p>

            <p className="mb-2"><strong>Status:</strong> <span className={room.status === "Vacant" ? "text-green-600" : "text-red-500"}>{room.status}</span></p>
            <p className="mb-4"><strong>Availability:</strong> <span className={room.availability ? "text-green-600" : "text-red-500"}>{room.availability ? "Available" : "Not Available"}</span></p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={handleCheckIn}
                disabled={!room.availability}
                className={`px-5 py-2 rounded-lg font-medium ${room.availability ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                Check-in
              </button>

              <button
                onClick={handleCheckOut}
                className="px-5 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Check-out
              </button>

              <button
                onClick={handleReportIssue}
                className="px-5 py-2 rounded-lg font-medium bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Report Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetailUser;
