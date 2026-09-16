import { Router } from 'express';
import { assignOrder, createOrder, deleteOrder, getOrder, listOrders, updateOrder, updateStatus } from '../controllers/orderController.js';
const router = Router();
router.route('/').get(listOrders).post(createOrder);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);
router.patch('/:id/assign', assignOrder); router.patch('/:id/status', updateStatus);
export default router;
