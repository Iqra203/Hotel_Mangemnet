import express from 'express';
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getRoomById,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);              // Create booking
router.get('/', getAllBookings);              // Get all bookings
router.put('/:id', updateBooking);            // Update booking by ID
router.delete('/:id', deleteBooking);         // Delete booking by ID
router.get('/room/:id', getRoomById);  

export default router;
