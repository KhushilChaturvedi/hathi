import express from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { listMockProjects, submitMockProject } from '../controllers/mockProjectsController.js';
const router = express.Router();

router.get('/:role/:level', listMockProjects);
router.post('/submit', auth, requireRole('student'), submitMockProject);

export default router;
