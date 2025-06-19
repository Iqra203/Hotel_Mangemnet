import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: String,
  },
  issueType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Housekeeper', depending on your setup
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

export default Maintenance;
