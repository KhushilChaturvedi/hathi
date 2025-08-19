import Project from '../models/Project.js';
import Notification from '../models/Notification.js';
import { getRazorpay } from '../utils/razorpay.js';

const minWords = (s)=> String(s || '').trim().split(/\s+/).filter(Boolean).length;

export const createProject = async (req,res)=>{
  try{
    const { title, description, problem, solution, targetAudience, revenueModel, requiredRoles = [], timeline, technicalRequirements, premium } = req.body;
    if (!title || !description || !problem || !solution || !targetAudience || !revenueModel){
      return res.status(400).json({ success:false, message:'All fields are required' });
    }
    if (minWords(description) < 100 || minWords(problem) < 100 || minWords(solution) < 100){
      return res.status(400).json({ success:false, message:'Description, problem, and solution must be at least 100 words' });
    }
    const project = await Project.create({
      title, description, problem, solution, targetAudience, revenueModel, requiredRoles, timeline, technicalRequirements, premium: !!premium, entrepreneurId: req.user.id
    });

    if (premium) {
      // ✅ new Razorpay code
      const priceInINR = Number(process.env.PREMIUM_PRICE_INR || 499);
      const amountPaise = Math.max(100, Math.round(priceInINR * 100));

      const razorpay = getRazorpay();
      const order = await razorpay.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: `project_${project._id}_${Date.now()}`,
        notes: { projectId: String(project._id), entrepreneurId: String(req.user.id) },
      });

      project.razorpayOrderId = order.id;
      project.premiumAmountPaise = amountPaise;
      await project.save();

      return res.status(201).json({
        success: true,
        projectId: project._id,
        message: 'Project submitted for review. Complete payment to mark premium.',
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID,
        },
      });
    }

    res.status(201).json({ success:true, projectId: project._id, message:'Project submitted for review' });
  }catch(e){
    res.status(500).json({ success:false, message:e.message });
  }
};


export const approveProject = async (req,res)=>{
  try{
    const { projectId, approved, reason } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success:false, message:'Not found' });
    project.status = approved ? 'approved' : 'closed';
    await project.save();
    if (!approved){
      await Notification.create({ userId: project.entrepreneurId, message: `Project rejected: ${reason || 'No reason provided'}` });
    }
    res.json({ success:true, message:'Project updated' });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};

export const listApproved = async (_req,res)=>{
  try{
    const projects = await Project.find({ status: 'approved', openUntil: { $gt: new Date() } }).sort({ createdAt:-1 });
    res.json({ success:true, projects, message:'OK' });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};

export const updateMilestone = async (req,res)=>{
  try{
    const { id } = req.params;
    const { name, status } = req.body;
    const p = await Project.findById(id);
    if (!p) return res.status(404).json({ success:false, message:'Not found' });
    const m = (p.milestones || []).find(x=>x.name===name);
    if (m) m.status = status;
    else p.milestones.push({ name, status: status || 'pending' });
    await p.save();
    res.json({ success:true, project: p });
  }catch(e){ res.status(500).json({ success:false, message:e.message }); }
};
