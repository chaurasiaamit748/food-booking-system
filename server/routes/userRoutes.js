import { Router } from 'express';
import { createDelivery, getDelivery, listDelivery, toggleDelivery, updateDelivery } from '../controllers/userController.js';
const router = Router();
router.route('/delivery-boys').get(listDelivery).post(createDelivery);
router.route('/delivery-boys/:id').get(getDelivery).put(updateDelivery);
router.patch('/delivery-boys/:id/status', toggleDelivery);
export default router;
