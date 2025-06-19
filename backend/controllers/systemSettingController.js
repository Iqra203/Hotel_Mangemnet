import SystemSetting from '../Models/SystemSetting.js';

// Create
export const createSystemSetting = async (req, res) => {
  try {
    const existing = await SystemSetting.findOne();
    if (existing) {
      return res.status(400).json({ message: 'Settings already exist. Please update instead.' });
    }

    const newSetting = new SystemSetting(req.body);
    await newSetting.save();
    res.status(201).json({ message: 'System settings created', setting: newSetting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get
export const getSystemSetting = async (req, res) => {
  try {
    const setting = await SystemSetting.findOne();
    if (!setting) return res.status(404).json({ message: 'Settings not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateSystemSetting = async (req, res) => {
  try {
    const setting = await SystemSetting.findOne();
    if (!setting) return res.status(404).json({ message: 'Settings not found' });

    Object.assign(setting, req.body);
    await setting.save();
    res.json({ message: 'Settings updated', setting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
export const deleteSystemSetting = async (req, res) => {
  try {
    const setting = await SystemSetting.findOne();
    if (!setting) return res.status(404).json({ message: 'Settings not found' });

    await setting.deleteOne();
    res.json({ message: 'Settings deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
