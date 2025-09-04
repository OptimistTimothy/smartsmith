import express from 'express';
import { productControllers } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/', productControllers.getAllProducts);

productRouter.get('/:id', productControllers.getOneProduct);

export default productRouter;
