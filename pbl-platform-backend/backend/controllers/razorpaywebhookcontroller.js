// backend/controllers/razorpayWebhookController.js
import crypto from 'crypto';
import Project from '../models/Project.js';

export async function razorpayWebhook(req, res) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = req.rawBody; // make sure to preserve rawBody on this route

  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (expected !== signature) return res.status(400).send('Invalid signature');

  const event = JSON.parse(body);

  if (event.event === 'payment.captured') {
    const orderId = event.payload.payment.entity.order_id;
    const project = await Project.findOne({ razorpayOrderId: orderId });
    if (project) {
      project.premiumPaid = true;
      await project.save();
    }
  }
  return res.json({ received: true });
}
