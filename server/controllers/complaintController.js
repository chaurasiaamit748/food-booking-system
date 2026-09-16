import Complaint from '../models/Complaint.js';

export const listComplaints = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
  res.json(await Complaint.find(filter).populate('user', 'name email phone').sort('-createdAt'));
};

export const createComplaint = async (req, res) => {
  const { subject, category, orderId, message } = req.body;
  if (!subject || !category || !message) return res.status(400).json({ message: 'Subject, category and message are required' });
  res.status(201).json(await Complaint.create({ user: req.user._id, subject, category, orderId, message }));
};

export const updateComplaint = async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
  res.json(complaint);
};
