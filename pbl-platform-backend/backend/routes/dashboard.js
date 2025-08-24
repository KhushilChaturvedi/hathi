import express from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { 
  studentDashboard, 
  entrepreneurDashboard, 
  adminDashboard 
} from '../controllers/dashboardController.js';

const router = express.Router();

// Student dashboard - only students can access
router.get("/student", auth, requireRole('student'), studentDashboard);

// Entrepreneur dashboard - only entrepreneurs can access
router.get("/entrepreneur", auth, requireRole('entrepreneur'), entrepreneurDashboard);

// Admin dashboard - only admins can access
router.get("/admin", auth, requireRole('admin'), adminDashboard);

export default router;
