import Team from '../models/Team.js';
import User from '../models/User.js';
import Project from '../models/Project.js';

export const joinTeam = async (req,res)=>{
  try{
    const { projectId, role } = req.body;
    const user = await User.findById(req.user.id);
    const level3 = user.levels?.some(l => l.role === role && l.level === 'Level 3');
    if (!level3) return res.status(400).json({ success:false, message:'Level 3 required for this role' });
    const project = await Project.findById(projectId);
    if (!project || project.status !== 'approved') return res.status(400).json({ success:false, message:'Project not joinable' });
    let team = await Team.findOne({ projectId });
    if (!team) team = await Team.create({ projectId, members: [] });
    const already = team.members.some(m => String(m.userId) === req.user.id);
    if (!already) team.members.push({ userId: req.user.id, role, level: 'Level 3' });
    await team.save();
    res.json({ success:true, teamId: team._id, message:'Joined team' });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};

export const reassign = async (req,res)=>{
  try{
    const { role } = req.body;
    const students = await User.find({ role: 'student', 'levels.level':'Level 3' });
    const suggested = students.filter(s => s.levels.some(l => l.role === role && l.level === 'Level 3')).slice(0, 10);
    res.json({ success:true, suggestedUsers: suggested.map(s=>({ id: s._id, email: s.email })), message:'OK' });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};

export const dashboard = async (req,res)=>{
  try{
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    const team = await Team.findOne({ projectId });
    const links = { teams: 'https://teams.microsoft.com', github: 'https://github.com' };
    const total = (project?.milestones || []).length || 1;
    const done = (project?.milestones || []).filter(m=>m.status==='completed').length;
    const progress = Math.round((done / total) * 100);
    res.json({ success:true, project, team, links, progress, message:'OK' });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};
