import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import CreateOrder from './pages/CreateOrder';
import DeliveryBoys from './pages/DeliveryBoys';
import Payment from './pages/Payment';
import { ActiveDeliveries, CompletedDeliveries, MyOrders } from './pages/DeliveryPages';
import Complaints from './pages/Complaints';
import { useAuth } from './context/AuthContext';

export default function App() { useAuth(); return <Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<Login />} /><Route path="/payment" element={<ProtectedRoute />}><Route index element={<Payment />} /></Route><Route element={<ProtectedRoute role="admin" />}><Route path="/admin" element={<Layout />}><Route path="dashboard" element={<Dashboard />} /><Route path="orders" element={<Orders />} /><Route path="orders/create" element={<CreateOrder />} /><Route path="delivery-boys" element={<DeliveryBoys />} /><Route path="track-orders" element={<Orders />} /><Route path="history" element={<Orders history />} /><Route path="complaints" element={<Complaints />} /></Route></Route><Route element={<ProtectedRoute role="delivery" />}><Route path="/delivery" element={<Layout />}><Route path="dashboard" element={<Dashboard />} /><Route path="orders" element={<MyOrders />} /><Route path="active" element={<ActiveDeliveries />} /><Route path="complaints" element={<Complaints />} /><Route path="profile" element={<Dashboard />} /></Route></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>; }
