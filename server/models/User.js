import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true },
  aadhaarNumber: { type: String, select: false, default: '' },
  companyId: { type: String, default: '' },
  livePhoto: { type: String, select: false, default: '' },
  location: { latitude: Number, longitude: Number, capturedAt: Date },
  role: { type: String, enum: ['admin', 'delivery'], default: 'delivery' },
  address: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = function comparePassword(value) { return bcrypt.compare(value, this.password); };
export default mongoose.model('User', userSchema);
