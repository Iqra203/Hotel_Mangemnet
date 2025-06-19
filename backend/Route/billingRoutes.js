import express from 'express';
import { generateBill, getBillById } from '../controllers/billingController.js'; // Adjust path if necessary

const router = express.Router();

router.post('/generate', generateBill);
router.get('/:id', getBillById);

export default router;
