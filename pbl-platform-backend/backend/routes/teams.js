import express from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { joinTeam, reassign } from '../controllers/teamsController.js';
const router = express.Router();

router.post('/join', auth, requireRole('student'), joinTeam);
router.post('/reassign', auth, requireRole('entrepreneur','admin'), reassign);

export default router;
