import express from 'express';
import authRoutes from './Route/auth.js';
import mongoose from './db.js'; 
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import roomRoutes from './Route/roomRoutes.js';
import housekeeperRoutes from './Route/housekeeperRoutes.js';
import feedbackRoutes from './Route/feedbackRoutes.js';
import reportRoutes from './Route/reportRoutes.js';
import bookingRoutes from './Route/bookingRoutes.js';
import userRoutes from './Route/users.js';
import systemSettingsRoutes from './Route/systemSettingRoutes.js';
import maintenanceRoutes from './Route/maintenanceRoutes.js';
import billingRoutes from './Route/billingRoutes.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/housekeepers', housekeeperRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/systemSetting', systemSettingsRoutes);
app.use('/api/maintenance', maintenanceRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/billing', billingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
