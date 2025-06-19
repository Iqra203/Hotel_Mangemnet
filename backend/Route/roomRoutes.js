import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', upload.single('image'), createRoom);
router.put('/:id', upload.single('image'), updateRoom);
router.delete('/:id', deleteRoom);

export default router;
