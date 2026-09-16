import { Router } from 'express';
import { adminDashboard, deliveryDashboard } from '../controllers/dashboardController.js';
import { allowRoles } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/admin', allowRoles('admin'), adminDashboard); router.get('/delivery', allowRoles('delivery'), deliveryDashboard);
export default router;
