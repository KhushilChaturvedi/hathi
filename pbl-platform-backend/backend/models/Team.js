import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  level: { type: String, enum: ['Level 1','Level 2','Level 3'], required: true }
}, {_id: false});

const TeamSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  members: [MemberSchema],
  status: { type: String, enum: ['forming','active','completed'], default: 'forming' }
}, { timestamps: true });

export default mongoose.model('Team', TeamSchema);
