import express from 'express';
import { orderControllers } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const orderRoutes = express.Router();

orderRoutes.post('/create', protect, orderControllers.addOrderItems);

orderRoutes.get('/:id', protect, orderControllers.getOrderItems);

orderRoutes.put('/:id/pay', protect, orderControllers.updateOrderToPaid);


export default orderRoutes;
