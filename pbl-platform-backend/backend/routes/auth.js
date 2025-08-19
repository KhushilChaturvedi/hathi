import express from 'express';
import { signup, login, verifyEmail, deleteUser } from '../controllers/usersController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/delete', auth, deleteUser);

export default router;
