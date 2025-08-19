import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success:false, message:'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.suspended) return res.status(401).json({ success:false, message:'Unauthorized' });
    req.user = { id: user._id.toString(), role: user.role, emailVerified: user.emailVerified };
    next();
  } catch (e) {
    res.status(401).json({ success:false, message:'Invalid token' });
  }
};

export const requireRole = (...roles) => (req,res,next) => {
  if (!req.user) return res.status(401).json({ success:false, message:'Unauthorized' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ success:false, message:'Forbidden' });
  next();
};
