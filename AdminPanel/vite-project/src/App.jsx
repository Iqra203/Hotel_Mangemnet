import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/Login';
import UserDashboard from './pages/UserDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UpdateBookingStatus from './pages/UpdateBookingStatus';
import Unauthorized from './pages/Unauthorized';

import ProtectedRoute from './components/ProtectedRoute';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UserTable from './components/UserTable';
import HousekeeperForm from './pages/HousekeeperForm';
import HousekeeperList from './pages/HousekeeperList';
import EditHousekeeper from './pages/EditHousekeeper';
import Feedbacks from './pages/Feedbacks';
import Reports from './pages/Reports';
import ReportsList from './pages/ReportsList';
import UpdateReport from './pages/UpdateReport';
import SystemSettings from './pages/SystemSettings';
import DisplaySystemSetting from './pages/DisplaySystemSetting';
import UpdateSystemSetting from './pages/UpdateSystemSetting';
import MaintenanceForm from './pages/MaintenanceForm';
import MaintenanceTable from './pages/MaintenanceTable';
import UpdateMaintenance from './pages/UpdateMaintenance';
import RoomForm from './pages/RoomForm';
import RoomsList from './pages/RoomsList';
import EditRoom from './pages/EditRoom';
import BookNowForm from './pages/BookNowForm';
import BookingList from './pages/BookingList';
import BookingBill from './pages/BookingBill';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/userTable" element={<UserTable />} />
          <Route path="/add-housekeeper" element={<HousekeeperForm />} />
          <Route path="/housekeeper-list" element={<HousekeeperList />} />
          <Route path="/edit-housekeeper/:id" element={<EditHousekeeper />} />
          <Route path="/feedback" element={<Feedbacks/>} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/update-report/:id" element={<UpdateReport />} />
        <Route path="/reports-list" element={<ReportsList />} />
        <Route path="/reports-list" element={<ReportsList />} />
        <Route path="/systemSetting" element={<SystemSettings />} />
        <Route path="/disSystemSetting" element={<DisplaySystemSetting />} />
        <Route path="/updateSystemSetting" element={<UpdateSystemSetting />} />
        <Route path="/MaintenanceForm" element={<MaintenanceForm />} />
        <Route path="/MaintenanceTable" element={<MaintenanceTable />} />
        <Route path="/maintenance/update/:id" element={<UpdateMaintenance />} />
        <Route path="/rooms" element={<RoomForm />} />
        <Route path="/rooms-list" element={<RoomsList />} />
        <Route path="/rooms/edit/:id" element={<EditRoom />} />
        <Route path="/rooms/:roomId/book" element={<BookNowForm />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/booking-bill/:bookingId" element={<BookingBill />} />





          {/* Protected routes */}
          
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* You can protect these too if needed */}
          <Route path="/staff" element={<UpdateBookingStatus />} />
          <Route index
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
            />
          <Route index 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
          <Dashboard />
          </ProtectedRoute>
        } />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default App;






// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupForm from './components/SignupForm';
// import LoginForm from './components/Login';
// import UserDashboard from './pages/UserDashboard';
// import StaffDashboard from './pages/StaffDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import BookingCreate from './pages/BookingCreate';

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import UpdateBookingStatus from './pages/UpdateBookingStatus';

// const App = () => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Router>
//         <Routes>
//           <Route path="/signup" element={<SignupForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/user-dashboard" element={<UserDashboard />} />
//           <Route path="/staff-dashboard" element={<StaffDashboard />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/book" element={<BookingCreate />} />
//           <Route path="/staff" element={<UpdateBookingStatus />} />
//           {/* <Route path="/book/:roomId" element={<BookingCreate />} /> */}
//         </Routes>
//       </Router>
//     </LocalizationProvider>
//   );
// };

// export default App;

