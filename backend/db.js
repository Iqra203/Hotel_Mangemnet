import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/LHMS'; 

console.log(`🔗 Connecting to MongoDB: ${db_url}`);

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(error => {
  console.error('❌ Error connecting to MongoDB:', error);
  process.exit(1);
});

export default mongoose;
