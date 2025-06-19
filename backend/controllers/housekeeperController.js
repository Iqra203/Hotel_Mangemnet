// controllers/housekeeperController.js
import Housekeeper from '../Models/Housekeeper.js';

// Create
export const createHousekeeper = async (req, res) => {
  try {
    const newHousekeeper = await Housekeeper.create(req.body);
    res.status(201).json(newHousekeeper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
export const getHousekeepers = async (req, res) => {
  try {
    const housekeepers = await Housekeeper.find();
    res.json(housekeepers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
export const getHousekeeperById = async (req, res) => {
  try {
    const housekeeper = await Housekeeper.findById(req.params.id);
    if (!housekeeper) return res.status(404).json({ error: 'Not found' });
    res.json(housekeeper);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
};

// Update
export const updateHousekeeper = async (req, res) => {
  try {
    const updated = await Housekeeper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteHousekeeper = async (req, res) => {
  try {
    const deleted = await Housekeeper.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
