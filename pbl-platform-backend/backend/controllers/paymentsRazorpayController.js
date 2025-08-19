// backend/controllers/paymentsRazorpayController.js
import crypto from 'crypto';
import Project from '../models/Project.js';

export async function verifyRazorpayPayment(req, res, next) {
  try {
    const { projectId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!projectId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    const isValid = sign === razorpay_signature;
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // mark project as paid
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ error: 'Order ID mismatch' });
    }

    project.premiumPaid = true;          // this field already existed
    project.status = project.status || 'pending'; // keep your workflow
    await project.save();

    return res.json({ message: 'Payment verified and project marked as premiumPaid' });
  } catch (err) {
    next(err);
  }
}

