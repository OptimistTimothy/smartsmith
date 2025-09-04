import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import products from './data/products.js';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRouter);

app.use('/api/auth', authRoutes);

app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
})



app.use((req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
