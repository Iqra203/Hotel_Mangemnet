import Maintenance from '../Models/Maintenance.js';

import mongoose from 'mongoose';

// CREATE
export const createMaintenanceRequest = async (req, res) => {
  try {
    const { roomId, reportedBy, issueType, description, assignedTo, priority, status } = req.body;

    if (!roomId || !reportedBy || !issueType || !description || !assignedTo || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ error: 'Invalid assignedTo ID' });
    }

    const maintenanceRequest = new Maintenance({
      roomId,
      reportedBy,
      issueType,
      description,
      assignedTo,
      priority,
      status: status || 'Pending',
    });

    await maintenanceRequest.save();
    res.status(201).json(maintenanceRequest);
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ error: 'Invalid data' });
  }
};

// READ ALL
export const getMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await Maintenance.find().populate('assignedTo');
    res.status(200).json(maintenanceRequests);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching records' });
  }
};

// READ BY ID
export const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id).populate('assignedTo');
    if (!maintenance) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

// UPDATE
export const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updated = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: 'Update failed' });
  }
};

// DELETE
export const deleteMaintenanceRequest = async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};
