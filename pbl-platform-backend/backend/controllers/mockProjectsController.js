import MockProject from '../models/MockProject.js';
import CompletedProject from '../models/CompletedProject.js';

export const listMockProjects = async (req,res)=>{
  const { role, level } = req.params;
  const items = await MockProject.find({ role, level });
  res.json({ success:true, mockProjects: items, message:'OK' });
};

export const submitMockProject = async (req,res)=>{
  const { mockProjectId, githubLink, role, level } = req.body;
  if (!githubLink) return res.status(400).json({ success:false, message:'githubLink required' });
  const cp = await CompletedProject.create({ userId: req.user.id, projectId: null, role, level, githubLink, approved:false });
  res.status(201).json({ success:true, submissionId: cp._id, message:'Submitted for verification' });
};
