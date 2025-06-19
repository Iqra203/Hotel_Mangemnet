import mongoose from 'mongoose';

const systemSettingSchema = new mongoose.Schema({
  standardRate: Number,
  deluxeRate: Number,
  suiteRate: Number,
  cancellationPolicy: String,
  serviceTax: Number,
  cityTax: Number,
}, { timestamps: true });

const SystemSetting = mongoose.model('SystemSetting', systemSettingSchema);

export default SystemSetting;
