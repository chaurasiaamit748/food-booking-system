import Order from '../models/Order.js';
import User from '../models/User.js';
export const adminDashboard = async (req, res) => {
  const [orders, deliveryBoys] = await Promise.all([Order.countDocuments(), User.countDocuments({ role: 'delivery' })]);
  const grouped = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  const stats = Object.fromEntries(grouped.map((item) => [item._id, item.count]));
  res.json({ totalOrders: orders, totalDeliveryBoys: deliveryBoys, pending: stats.Pending || 0, assigned: stats.Assigned || 0, outForDelivery: stats['Out for Delivery'] || 0, delivered: stats.Delivered || 0 });
};
export const deliveryDashboard = async (req, res) => {
  const grouped = await Order.aggregate([{ $match: { assignedTo: req.user._id } }, { $group: { _id: '$status', count: { $sum: 1 } } }]);
  const stats = Object.fromEntries(grouped.map((item) => [item._id, item.count]));
  res.json({ assigned: stats.Assigned || 0, pending: (stats.Assigned || 0) + (stats['Picked Up'] || 0), outForDelivery: stats['Out for Delivery'] || 0, completed: stats.Delivered || 0 });
};
