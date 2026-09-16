import { CheckCircle2, Clock3, MapPin, PackageCheck, Search, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import OrderTable from '../components/OrderTable';
import '../order-pages.css';

function DeliveryPage({ view }) {
  const [orders, setOrders] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [search, setSearch] = useState('');
  const config = { all: ['My Orders', 'Every order assigned to your delivery account.', 'hero-orders', 'Your route', 'Review every package and its current status.'], active: ['Active Deliveries', 'Keep today\'s deliveries moving from pickup to doorstep.', 'hero-active', 'Next stop', 'Update each active delivery as you move.'], completed: ['Completed Deliveries', 'A clear record of everything delivered successfully.', 'hero-completed', 'Great work', 'Your completed handoffs are collected here.'] }[view];
  const load = () => { setLoading(true); setError(''); api.get('/orders').then(({ data }) => setOrders(Array.isArray(data) ? data : [])).catch((err) => setError(err.response?.data?.message || 'Server connection unavailable')).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const filtered = orders.filter((order) => { const matchesView = view === 'active' ? ['Assigned', 'Picked Up', 'Out for Delivery'].includes(order.status) : view === 'completed' ? order.status === 'Delivered' : true; const term = search.toLowerCase(); return matchesView && (!term || `${order.orderId} ${order.customerName}`.toLowerCase().includes(term)); });
  const update = (order, status) => api.patch(`/orders/${order._id}/status`, { status }).then(load);
  const metrics = [['Assigned', orders.filter((o) => o.status === 'Assigned').length, PackageCheck], ['In progress', orders.filter((o) => ['Picked Up', 'Out for Delivery'].includes(o.status)).length, Truck], ['Delivered', orders.filter((o) => o.status === 'Delivered').length, CheckCircle2]];
  return <div className="content delivery-orders-page"><div className={`orders-hero ${config[2]}`}><div><p className="eyebrow">Driver workspace</p><h2>{config[0]}</h2><p>{config[1]}</p></div><div className="hero-note"><span>{config[3]}</span><strong>{config[4]}</strong></div></div><div className="order-metrics">{metrics.map(([label, value, Icon]) => <div className="order-metric blue" key={label}><span><Icon size={18} /></span><div><small>{label}</small><strong>{value}</strong></div></div>)}</div><div className="toolbar"><div className="search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your orders" /></div><span className="orders-count"><MapPin size={14} /> {filtered.length} orders</span></div><section className="panel"><div className="panel-heading"><div><h3>{view === 'active' ? 'Deliveries in motion' : view === 'completed' ? 'Successful deliveries' : 'Your assigned orders'}</h3><p>Keep your route details close at hand.</p></div></div>{loading ? <div className="orders-loading"><p>Loading orders...</p></div> : error ? <div className="orders-error"><p>{error}</p><button className="secondary-btn" onClick={load}>Try again</button></div> : <OrderTable orders={filtered} onStatus={view !== 'completed' ? update : undefined} />}</section></div>;
}
export function MyOrders() { return <DeliveryPage view="all" />; }
export function ActiveDeliveries() { return <DeliveryPage view="active" />; }
export function CompletedDeliveries() { return <DeliveryPage view="completed" />; }
