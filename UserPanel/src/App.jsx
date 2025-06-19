import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import RoomDetail from './Pages/RoomDetail';
import Booking from './Pages/Booking';
import FeedbackForm from './Pages/FeedbackForm';

import AdditionalServicesForm from './Pages/AdditionalServicesForm';

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import RoomFeatures from './Pages/Rooms';
import { useNavigate } from 'react-router-dom';
import UserMaintenanceForm from './Pages/UserMaintenanceForm';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} />
    
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        



        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<SignIn />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/roomf" element={<RoomFeatures  />} />

        <Route path="/additionalServices" element={<AdditionalServicesForm />} />
        <Route path="/feedbackForm" element={<FeedbackForm />} />
      

        <Route path="/rooms" element={<RoomFeatures />} />
    <Route path="/rooms/:id" element={<RoomDetail />} />
    <Route path="/userMaintenance" element={<UserMaintenanceForm />} />

  
      </Routes>
    </BrowserRouter>
  );
};

export default App;
