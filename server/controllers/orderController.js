import Order from '../models/Order.js';
import User from '../models/User.js';
const nextStatus = { Assigned: 'Picked Up', 'Picked Up': 'Out for Delivery', 'Out for Delivery': 'Delivered' };
export const listOrders = async (req, res) => {
  const filter = req.user.role === 'delivery' ? { $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }] } : {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) filter.$or = [{ orderId: new RegExp(req.query.search, 'i') }, { customerName: new RegExp(req.query.search, 'i') }];
  res.json(await Order.find(filter).populate('assignedTo', 'name phone').sort('-createdAt'));
};
export const getOrder = async (req, res) => res.json(await Order.findById(req.params.id).populate('assignedTo', 'name phone'));
export const createOrder = async (req, res) => res.status(201).json(await Order.create({ ...req.body, createdBy: req.user._id }));
export const updateOrder = async (req, res) => res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
export const assignOrder = async (req, res) => {
  const delivery = await User.findOne({ _id: req.body.assignedTo, role: 'delivery', isActive: true });
  if (!delivery) return res.status(400).json({ message: 'Active delivery boy not found' });
  res.json(await Order.findByIdAndUpdate(req.params.id, { assignedTo: delivery._id, status: 'Assigned' }, { new: true }).populate('assignedTo', 'name phone'));
};
export const updateStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || (req.user.role === 'delivery' && String(order.assignedTo) !== String(req.user._id))) return res.status(404).json({ message: 'Order not found' });
  if (req.user.role === 'delivery' && nextStatus[order.status] !== req.body.status) return res.status(400).json({ message: `Invalid transition from ${order.status}` });
  order.status = req.body.status;
  if (order.status === 'Delivered') order.deliveredAt = new Date();
  res.json(await order.save());
};
export const deleteOrder = async (req, res) => { await Order.findByIdAndDelete(req.params.id); res.status(204).end(); };
