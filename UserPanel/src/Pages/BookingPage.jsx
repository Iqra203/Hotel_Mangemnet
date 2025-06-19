import React from "react";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomType = searchParams.get("roomType");

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-4">Booking Page</h1>
      <p className="text-xl">
        You are booking: <strong>{roomType}</strong>
      </p>
    </div>
  );
};

export default BookingPage;
