import React, { useState } from 'react';

const AdditionalServicesForm = () => {
  const [name, setName] = useState('');
  const [roomService, setRoomService] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [transportation, setTransportation] = useState(false);
  const [specialRequest, setSpecialRequest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceRequestData = { name, roomService, laundry, transportation, specialRequest };
    console.log('Additional Service Request:', serviceRequestData);
    alert('Your service request has been submitted!');

    // Reset form fields
    setName('');
    setRoomService(false);
    setLaundry(false);
    setTransportation(false);
    setSpecialRequest('');
  };

  return (
    <div className="service-form">
      <h2 className="text-xl font-bold">Request Additional Services</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Select Services</label>
          <div>
            <input
              type="checkbox"
              id="roomService"
              checked={roomService}
              onChange={() => setRoomService(!roomService)}
            />
            <label htmlFor="roomService">Room Service</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="laundry"
              checked={laundry}
              onChange={() => setLaundry(!laundry)}
            />
            <label htmlFor="laundry">Laundry</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="transportation"
              checked={transportation}
              onChange={() => setTransportation(!transportation)}
            />
            <label htmlFor="transportation">Transportation</label>
          </div>
        </div>
        <div>
          <label className="block">Special Requests</label>
          <textarea
            className="textarea"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default AdditionalServicesForm;
