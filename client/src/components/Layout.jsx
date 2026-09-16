import { NavLink, Outlet } from 'react-router-dom';
import { Box, ClipboardList, FileWarning, LayoutDashboard, LogOut, MapPinned, Plus, Truck, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth(); const admin = user?.role === 'admin';
  const links = admin ? [['Dashboard', '/admin/dashboard', LayoutDashboard], ['Orders', '/admin/orders', ClipboardList], ['Create Order', '/admin/orders/create', Plus], ['Delivery Boys', '/admin/delivery-boys', Users], ['Track Orders', '/admin/track-orders', MapPinned], ['Complaints', '/admin/complaints', FileWarning]] : [['Dashboard', '/delivery/dashboard', LayoutDashboard], ['My Orders', '/delivery/orders', ClipboardList], ['Active Deliveries', '/delivery/active', Truck], ['Complaints', '/delivery/complaints', FileWarning]];
  const displayName = user?.name || 'Delivery partner';
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark"><Truck size={19} /></span><span>FASTWAY<small>Delivery command</small></span></div><nav>{links.map(([label, to, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={18} />{label}</NavLink>)}</nav><button className="logout" onClick={logout}><LogOut size={18} />Log out</button></aside><main className="main-content"><header className="topbar"><div><p className="eyebrow">{admin ? 'Operations center' : 'Driver workspace'}</p><h1>{admin ? 'Good morning, Admin' : `Welcome back, ${displayName.split(' ')[0]}`}</h1></div><div className="user-chip"><span>{displayName.charAt(0)}</span><div><strong>{displayName}</strong><small>{admin ? 'Administrator' : 'Delivery partner'}</small></div></div></header><Outlet /></main></div>;
}
