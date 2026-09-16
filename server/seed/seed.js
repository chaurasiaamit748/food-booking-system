import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';

await mongoose.connect(process.env.MONGO_URI);
await User.deleteMany({});
await User.create([
  { name: 'Fastway Admin', email: 'admin@fastway.com', password: 'Admin@123', phone: '+1 555 0100', role: 'admin', address: 'Operations HQ' },
  { name: 'Demo Delivery', email: 'delivery@fastway.com', password: 'Delivery@123', phone: '+1 555 0101', role: 'delivery', address: 'North district' }
]);
console.log('Seed complete. Demo credentials: admin@fastway.com / Admin@123; delivery@fastway.com / Delivery@123');
await mongoose.disconnect();
