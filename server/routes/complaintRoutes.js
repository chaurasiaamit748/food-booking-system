import { Router } from 'express';
import { createComplaint, listComplaints, updateComplaint } from '../controllers/complaintController.js';
import { allowRoles } from '../middleware/authMiddleware.js';

const router = Router();
router.route('/').get(listComplaints).post(createComplaint);
router.patch('/:id/status', allowRoles('admin'), updateComplaint);
export default router;
