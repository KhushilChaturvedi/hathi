import User from '../models/User.js';
import Project from '../models/Project.js';
import CompletedProject from '../models/CompletedProject.js';

export const listPendingProjects = async (_req,res)=>{
  const projects = await Project.find({ status:'pending' }).sort({ createdAt:1 });
  res.json({ success:true, projects, message:'OK' });
};

export const listUsers = async (_req,res)=>{
  const users = await User.find().select('-password');
  res.json({ success:true, users, message:'OK' });
};

export const suspendUser = async (req,res)=>{
  const { userId, suspend } = req.body;
  const u = await User.findById(userId);
  if (!u) return res.status(404).json({ success:false, message:'User not found' });
  u.suspended = !!suspend;
  await u.save();
  res.json({ success:true, message:'Updated' });
};

export const verifyLevel = async (req,res)=>{
  const { submissionId, approved } = req.body;
  const cp = await CompletedProject.findById(submissionId);
  if (!cp) return res.status(404).json({ success:false, message:'Submission not found' });
  cp.approved = !!approved;
  await cp.save();
  const user = await User.findById(cp.userId);
  if (approved && cp.level === 'Level 2') {
    const idx = (user.levels || []).findIndex(l => l.role === cp.role);
    if (idx >= 0) user.levels[idx].level = 'Level 3';
    else user.levels = [...(user.levels || []), { role: cp.role, level: 'Level 3' }];
    await user.save();
  }
  res.json({ success:true, message:'Verification saved' });
};
