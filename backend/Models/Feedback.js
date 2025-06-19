import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  email: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }, // Foreign key to Room
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
