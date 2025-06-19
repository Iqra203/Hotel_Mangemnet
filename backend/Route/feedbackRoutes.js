import express from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController.js';

const router = express.Router();

// CREATE feedback
router.post('/', createFeedback);

// GET all feedbacks
router.get('/', getAllFeedbacks);

// GET feedback by ID
router.get('/:id', getFeedbackById);

// UPDATE feedback
router.put('/:id', updateFeedback);

// DELETE feedback
router.delete('/:id', deleteFeedback);

export default router;
