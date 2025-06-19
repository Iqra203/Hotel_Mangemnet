// routes/housekeeperRoutes.js
import express from 'express';
import {
  createHousekeeper,
  getHousekeepers,
  getHousekeeperById,
  updateHousekeeper,
  deleteHousekeeper
} from '../controllers/housekeeperController.js';

const router = express.Router();

router.post('/', createHousekeeper);
router.get('/', getHousekeepers);
router.get('/:id', getHousekeeperById);
router.put('/:id', updateHousekeeper);
router.delete('/:id', deleteHousekeeper);

export default router;
