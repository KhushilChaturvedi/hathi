import mongoose from 'mongoose';

const CompletedProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  role: { type: String, required: true },
  level: { type: String, enum: ['Level 1','Level 2','Level 3'], required: true },
  githubLink: { type: String, required: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('CompletedProject', CompletedProjectSchema);
