import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import validator from 'validator';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { sendEmail } from '../utils/email.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req,res) => {
  try {
    const { email, password, role, skills = [], preferences = {} } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success:false, message:'Missing fields' });
    }

    if (!['student','entrepreneur'].includes(role)) {
      return res.status(400).json({ success:false, message:'Invalid role' });
    }

    if (!validator.isStrongPassword(password, { minLength:8, minLowercase:1, minUppercase:0, minNumbers:1, minSymbols:1 })) {
      return res.status(400).json({ success:false, message:'Password must be >=8 chars with numbers & special chars' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success:false, message:'Email already in use' });

    const user = await User.create({ email, password, role, skills, preferences });
    const token = signToken(user._id.toString());

    // email verification link
    const vtoken = crypto.randomBytes(24).toString('hex');
    await Token.create({ userId: user._id, token: vtoken, type:'emailVerify', expiresAt: new Date(Date.now()+ 24*60*60*1000) });
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${vtoken}`;
    await sendEmail(user.email, 'Verify your email', `<p>Click to verify: <a href="${verifyUrl}">${verifyUrl}</a></p>`);

    res.status(201).json({ 
      success:true, 
      userId: user._id, 
      email: user.email,
      role: user.role,
      token, 
      message:'Signup success. Check email to verify.' 
    });
  } catch(e){
    res.status(500).json({ success:false, message: e.message });
  }
};

export const login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ success:false, message:'Invalid credentials' });

    const token = signToken(user._id.toString());

    res.json({ 
      success:true, 
      userId: user._id, 
      email: user.email,
      role: user.role,   // 👈 return role here
      token, 
      message:'Login success' 
    });
  } catch(e){
    res.status(500).json({ success:false, message: e.message });
  }
};

export const verifyEmail = async (req,res)=>{
  try{
    const { token } = req.body;
    const t = await Token.findOne({ token, type:'emailVerify' });
    if (!t || t.expiresAt < new Date()) return res.status(400).json({ success:false, message:'Invalid/expired token' });
    const user = await User.findById(t.userId);
    if (!user) return res.status(404).json({ success:false, message:'User not found' });
    user.emailVerified = true;
    await user.save();
    await t.deleteOne();
    res.json({ success:true, message:'Email verified' });
  }catch(e){
    res.status(500).json({ success:false, message:e.message });
  }
};

export const deleteUser = async (req,res)=>{
  try{
    const userId = req.user?.id || req.body.userId;
    if (!userId) return res.status(400).json({ success:false, message:'userId required' });
    await User.findByIdAndDelete(userId);
    res.json({ success:true, message:'User data deleted' });
  }catch(e){
    res.status(500).json({ success:false, message:e.message });
  }
};

export const getMe = async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success:false, message:'User not found' });
    res.json({ success:true, user });
  } catch(e) {
    res.status(500).json({ success:false, message:e.message });
  }
};

// Special admin creation endpoint (protected by secret key)
export const createAdmin = async (req,res) => {
  try {
    const { email, password, secretKey } = req.body;
    
    // Check secret key (you can set this in environment variables)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ success:false, message:'Unauthorized' });
    }

    if (!email || !password) {
      return res.status(400).json({ success:false, message:'Missing fields' });
    }

    if (!validator.isStrongPassword(password, { minLength:8, minLowercase:1, minUppercase:0, minNumbers:1, minSymbols:1 })) {
      return res.status(400).json({ success:false, message:'Password must be >=8 chars with numbers & special chars' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success:false, message:'Email already in use' });

    const user = await User.create({ email, password, role: 'admin' });
    const token = signToken(user._id.toString());

    res.status(201).json({ 
      success:true, 
      userId: user._id, 
      email: user.email,
      role: user.role,
      token, 
      message:'Admin account created successfully' 
    });
  } catch(e){
    res.status(500).json({ success:false, message: e.message });
  }
};
