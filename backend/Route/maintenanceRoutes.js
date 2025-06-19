import express from 'express';
import {
  createMaintenanceRequest,
  getMaintenanceRequests,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenanceRequest
} from '../controllers/maintenanceController.js';  // Ensure this path is correct

const router = express.Router();

// Routes for maintenance records
router.post('/', createMaintenanceRequest); 
router.get('/', getMaintenanceRequests);  
router.get('/:id', getMaintenanceById);  
router.put('/:id', updateMaintenance);  
router.delete('/:id', deleteMaintenanceRequest);  

export default router;