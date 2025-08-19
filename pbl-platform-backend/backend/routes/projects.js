import express from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { createProject, approveProject, listApproved, updateMilestone } from '../controllers/projectsController.js';
const router = express.Router();

router.post('/create', auth, requireRole('entrepreneur'), createProject);
router.post('/approve', auth, requireRole('admin'), approveProject);
router.get('/', listApproved);
router.patch('/:id/milestones', auth, updateMilestone);

export default router;
