import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { _id: false });

const RequiredRoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  level: { type: String, enum: ['Level 1', 'Level 2', 'Level 3'], required: true }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  targetAudience: { type: String, required: true },
  revenueModel: { type: String, required: true },
  requiredRoles: [RequiredRoleSchema],
  timeline: { type: String },
  technicalRequirements: { type: String },
  entrepreneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending','approved','in-progress','completed','closed'], default: 'pending' },
  openUntil: { type: Date, default: () => new Date(Date.now() + 30*24*60*60*1000) },
  
  // Premium related
  premium: { type: Boolean, default: false },
  premiumPaid: { type: Boolean, default: false },
  razorpayOrderId: { type: String },             // ✅ added
  premiumAmountPaise: { type: Number, default: 0 }, // ✅ added

  milestones: [MilestoneSchema]
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
