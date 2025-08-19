// backend/routes/payments.js
import express, { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { verifyRazorpayPayment } from '../controllers/paymentsRazorpayController.js';
import { razorpayWebhook } from '../controllers/razorpaywebhookcontroller.js';

const router = Router();

// ✅ frontend calls this right after successful checkout
router.post('/razorpay/verify', auth, verifyRazorpayPayment);

// ✅ optional: Razorpay webhook (for automatic confirmation if user closes browser)
// NOTE: This must use raw body to verify signature
const rawJson = express.raw({ type: 'application/json' });
router.post('/razorpay/webhook', rawJson, (req, res, next) => {
  req.rawBody = req.body.toString('utf8'); // preserve raw body for signature verification
  razorpayWebhook(req, res, next);
});

export default router;
