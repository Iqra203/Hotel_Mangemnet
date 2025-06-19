// models/Report.js
import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reportName: { type: String, required: true },
  description: { type: String },
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Store analytics data (could be an object or array)
  generatedBy: { type: String, required: true }, // Who generated the report
  dateGenerated: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'archived'], default: 'pending' }
});

const Report = mongoose.model('Report', ReportSchema);

export default Report;
