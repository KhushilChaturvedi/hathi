import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import teamRoutes from './routes/teams.js';
import mockRoutes from './routes/mockProjects.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();

// ❌ remove Stripe webhook line:
// app.use('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }));

app.use(cors());
app.use(morgan('dev'));

// by default we parse JSON (safe for all routes)
app.use(express.json({ limit: '1mb' }));

// ✅ if you want Razorpay webhook, mount it here BEFORE json parser (raw body required)
import { razorpayWebhook } from './controllers/razorpayWebhookController.js';
app.post(
  '/api/payments/razorpay/webhook',
  express.raw({ type: 'application/json' }),
  (req, res, next) => {
    // preserve raw body as string for signature check
    req.rawBody = req.body.toString('utf8');
    razorpayWebhook(req, res, next);
  }
);

app.use(apiLimiter);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/mock-projects', mockRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payments', paymentRoutes);

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not found' })
);
app.use(errorHandler);

export default app;

