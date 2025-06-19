import express from 'express';
import {
  createSystemSetting,
  getSystemSetting,
  updateSystemSetting,
  deleteSystemSetting,
} from '../controllers/systemSettingController.js';

const router = express.Router();

router.post('/', createSystemSetting);
router.get('/', getSystemSetting);
router.put('/', updateSystemSetting);
router.delete('/', deleteSystemSetting);

export default router;
