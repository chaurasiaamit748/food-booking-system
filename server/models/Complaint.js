import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, enum: ['Delivery issue', 'Order issue', 'Payment issue', 'Other'], required: true },
  orderId: { type: String, trim: true, default: '' },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['Open', 'In Review', 'Resolved'], default: 'Open' }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
