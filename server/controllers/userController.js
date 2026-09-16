import User from '../models/User.js';
const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, address: user.address, isActive: user.isActive });
export const listDelivery = async (req, res) => res.json(await User.find({ role: 'delivery' }).select('-password').sort('-createdAt'));
export const getDelivery = async (req, res) => res.json(await User.findOne({ _id: req.params.id, role: 'delivery' }).select('-password'));
export const createDelivery = async (req, res) => res.status(201).json(safeUser(await User.create({ ...req.body, role: 'delivery' })));
export const updateDelivery = async (req, res) => res.json(await User.findOneAndUpdate({ _id: req.params.id, role: 'delivery' }, req.body, { new: true, runValidators: true }).select('-password'));
export const toggleDelivery = async (req, res) => res.json(await User.findOneAndUpdate({ _id: req.params.id, role: 'delivery' }, { isActive: req.body.isActive }, { new: true }).select('-password'));
