import express from 'express';
import { requireRole, auth } from '../middleware/auth.js';
import { listPendingProjects, listUsers, suspendUser, verifyLevel } from '../controllers/adminController.js';
const router = express.Router();

router.use(auth, requireRole('admin'));
router.get('/pending-projects', listPendingProjects);
router.get('/users', listUsers);
router.post('/suspend', suspendUser);
router.post('/verify-level', verifyLevel);

export default router;
