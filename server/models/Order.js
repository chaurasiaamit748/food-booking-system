import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customerName: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  packageDescription: { type: String, required: true },
  packageWeight: { type: Number, required: true, min: 0 },
  amount: { type: Number, required: true, min: 0 },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['Pending', 'Assigned', 'Picked Up', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveredAt: { type: Date, default: null }
}, { timestamps: true });
orderSchema.pre('save', function assignId(next) { if (!this.orderId) this.orderId = `FW-${Date.now().toString().slice(-7)}`; next(); });
export default mongoose.model('Order', orderSchema);
