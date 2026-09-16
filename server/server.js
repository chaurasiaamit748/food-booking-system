import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import { allowRoles, protect } from './middleware/authMiddleware.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'FASTWAY API' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', protect, allowRoles('admin'), userRoutes);
app.use('/api/orders', protect, orderRoutes);
app.use('/api/dashboard', protect, dashboardRoutes);
app.use('/api/complaints', protect, complaintRoutes);
app.use(notFound); app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`FASTWAY API listening on ${port}`))).catch((error) => { console.error(error.message); process.exit(1); });
