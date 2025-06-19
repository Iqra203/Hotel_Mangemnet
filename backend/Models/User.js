import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ['user', 'staff'] },
});

const User = mongoose.model('User', userSchema);
export default User;
