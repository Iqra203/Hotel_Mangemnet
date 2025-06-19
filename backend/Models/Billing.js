// models/Billing.js
import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }, // Or 'User' if you're linking it to a user system
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  roomNumber: { type: String, required: true }, // Based on Room.name
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },

  roomCharges: { type: Number, required: true },
  totalAmount: { type: Number, required: true },

  paymentMethod: { type: String, enum: ['Cash', 'Card', 'Online'], required: true },
  generatedAt: { type: Date, default: Date.now }
});

const Billing = mongoose.model('Billing', billingSchema);
export default Billing;
