import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  status: String,
  description: String,
  image: String,
  availability: Boolean
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;
