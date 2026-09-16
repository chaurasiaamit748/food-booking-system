import User from '../models/User.js';
import { signToken } from '../utils/token.js';

const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, address: user.address, companyId: user.companyId, location: user.location, isActive: user.isActive });
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password)) || !user.isActive) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: signToken(user._id), user: safeUser(user) });
};
export const me = (req, res) => res.json({ user: safeUser(req.user) });
export const register = async (req, res) => {
  const { name, email, password, phone, address, role, aadhaarNumber, companyId, livePhoto, location } = req.body;
  if (!name || !email || !password || !phone) return res.status(400).json({ message: 'Name, email, phone and password are required' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) return res.status(409).json({ message: 'An account with this email already exists' });
  if (!['admin', 'delivery'].includes(role)) return res.status(400).json({ message: 'Please select an account type' });
  if (role === 'delivery' && (!aadhaarNumber || !companyId || !livePhoto || !location?.latitude || !location?.longitude)) return res.status(400).json({ message: 'Aadhaar, company ID, live photo and live location are required for delivery registration' });
  const user = await User.create({ name, email: email.toLowerCase(), password, phone, address, role, aadhaarNumber, companyId, livePhoto, location: role === 'delivery' ? { ...location, capturedAt: new Date() } : undefined });
  res.status(201).json({ token: signToken(user._id), user: safeUser(user) });
};
