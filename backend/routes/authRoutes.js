import express from 'express';
import { authControllers } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const authRoutes = express.Router();

authRoutes.post('/register', authControllers.registerUser);

authRoutes.post('/login', authControllers.loginUser);

authRoutes.get('/users/profile', protect, authControllers.getUserProfile);

authRoutes.put('/users/profile', protect, authControllers.updateUserProfile);



export default authRoutes;