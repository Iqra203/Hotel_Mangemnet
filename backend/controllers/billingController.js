import Billing from '../Models/Billing.js';
import Booking from '../Models/Booking.js'; // Assuming you're using a Booking model

// Generate Bill
export const generateBill = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    if (!bookingId || !paymentMethod) {
      return res.status(400).json({ message: 'Booking ID and Payment Method are required.' });
    }

    // Fetch booking info (assuming Booking model exists)
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const { guestName, checkInDate, checkOutDate, room } = booking;

    // Calculate the number of nights
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const roomCharges = nights * room.price;

    // Create the bill object
    const bill = new Billing({
      guestId: booking._id,
      guestName, // Or use guest ID if you have one
      bookingId: booking._id,
      roomNumber: room.name,
      checkInDate,
      checkOutDate,
      roomCharges,
      totalAmount: roomCharges,
      paymentMethod,
    });

    // Save the bill
    const savedBill = await bill.save();
    res.status(201).json({ message: 'Bill generated successfully', bill: savedBill });
  } catch (error) {
    console.error('Error generating bill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bill' });
  }
};
