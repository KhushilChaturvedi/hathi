import mongoose from 'mongoose';

const MockProjectSchema = new mongoose.Schema({
  role: { type: String, required: true },
  level: { type: String, enum: ['Level 1','Level 2'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('MockProject', MockProjectSchema);
