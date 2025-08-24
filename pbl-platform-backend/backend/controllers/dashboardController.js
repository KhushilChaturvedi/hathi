import User from '../models/User.js';
import Project from '../models/Project.js';
import MockProject from '../models/MockProject.js';

export const studentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get user's level for their role
    const userLevel = user.levels.find(level => level.role === 'student')?.level || 'Level 1';

    // Get open projects (status: pending or approved)
    const openProjects = await Project.find({
      status: { $in: ['pending', 'approved'] }
    }).populate('entrepreneurId', 'email');

    // Get mock projects for student's level and below
    const levelNumber = parseInt(userLevel.split(' ')[1]) || 1;
    const mockProjects = await MockProject.find({
      role: 'student',
      $or: [
        { level: 'Level 1' },
        ...(levelNumber >= 2 ? [{ level: 'Level 2' }] : []),
        ...(levelNumber >= 3 ? [{ level: 'Level 3' }] : [])
      ]
    });

    res.json({
      success: true,
      email: user.email,
      role: user.role,
      skills: user.skills,
      level: userLevel,
      projects: openProjects,
      mockProjects: mockProjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const entrepreneurDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get entrepreneur's projects
    const projects = await Project.find({ entrepreneurId: req.user.id })
      .populate('entrepreneurId', 'email');

    res.json({
      success: true,
      email: user.email,
      role: user.role,
      projects: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get all users (excluding password)
    const users = await User.find({}).select('-password');

    // Get all projects
    const projects = await Project.find({}).populate('entrepreneurId', 'email');

    // Get all mock projects
    const mockProjects = await MockProject.find({});

    res.json({
      success: true,
      email: user.email,
      role: user.role,
      users: users,
      projects: projects,
      mockProjects: mockProjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
