// models/Housekeeper.js
import mongoose from 'mongoose';

const HousekeeperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
});

const Housekeeper = mongoose.model('Housekeeper', HousekeeperSchema);

export default Housekeeper;
