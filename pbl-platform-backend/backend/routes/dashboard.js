import express from 'express';
import { auth } from '../middleware/auth.js';
import { dashboard } from '../controllers/teamsController.js';
const router = express.Router();

router.get('/:projectId', auth, dashboard);

export default router;
