import { ArrowRight, Clock3, MapPin, PackageCheck, Send, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const fastFood = [
  { name: 'Pizza', detail: 'Hot, cheesy and made for sharing', price: 'From $12', image: 'https://png.pngtree.com/png-vector/20241211/ourmid/pngtree-authentic-italian-pizza-with-cheese-and-fresh-vegetable-toppings-png-image_14714611.png', tone: 'coral' },
  { name: 'Burger', detail: 'Stacked high. Delivered fresh.', price: 'From $10', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', tone: 'lime' },
  { name: 'Sandwich', detail: 'The perfect bite, wherever you are', price: 'From $8', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { name: 'Pasta', detail: 'Rich, comforting and full of flavor', price: 'From $11', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85', tone: 'coral' },
  { name: 'Fries', detail: 'Crispy, golden and made to share', price: 'From $6', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', tone: 'lime' },
  { name: 'Wrap', detail: 'Fresh fillings wrapped up just right', price: 'From $9', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85', tone: 'blue' },
  { name: 'Sushi', detail: 'Delicate rolls, prepared fresh', price: 'From $14', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85', tone: 'coral' },
  { name: 'Tacos', detail: 'Bold flavors in every crunchy bite', price: 'From $10', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=85', tone: 'lime' },
  { name: 'Dessert', detail: 'A sweet finish to your feast', price: 'From $7', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', tone: 'blue' }
];
export const indianFood = [
  ['Daal', 'Slow-cooked comfort with warm spices', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85'],
  ['Paneer', 'Soft cottage cheese in rich masala', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85'],
  ['Rice', 'Fragrant, fluffy and ready to pair', 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=900&q=85'],
  ['Puri', 'Golden, puffed and perfectly crisp', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85'],
  ['Salad', 'Fresh greens with a bright crunch', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85'],
  ['Chole', 'Chickpeas simmered in bold gravy', 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85'],
  ['Biryani', 'Aromatic rice layered with flavor', 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d7a?auto=format&fit=crop&w=900&q=85'],
  ['Dosa', 'Crisp South Indian classic', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85'],
  ['Chowmein', 'Wok-tossed noodles with vegetables', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=85'],
  ['Pani Puri', 'Tangy, spicy and full of fun', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85']
].map(([name, detail, image], index) => ({ name, detail, image, price: `From $${7 + index}`, tone: ['coral', 'lime', 'blue'][index % 3] }));

export function FoodImage({ src, alt }) {
  const fallback = 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85';
  return <img src={src} alt={alt} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallback; }} />;
}

export function DeliveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) return <div className="delivery-success"><span><PackageCheck size={25} /></span><h3>Delivery request received</h3><p>Our team will contact you shortly to confirm the route and price.</p><button className="secondary-btn" onClick={() => setSubmitted(false)}>Send another request</button></div>;
  return <form className="delivery-form" onSubmit={submit}><div className="form-grid"><label>Pickup location<input required placeholder="Where should we collect it?" /></label><label>Delivery destination<input required placeholder="Where should we deliver it?" /></label><label>Your name<input required placeholder="Full name" /></label><label>Phone number<input required type="tel" placeholder="Best number to reach you" /></label><label className="full-field">What are we delivering?<textarea required placeholder="Package, documents, food or anything else" rows="4"></textarea></label></div><button className="primary-btn" type="submit">Request delivery <Send size={16} /></button></form>;
}

export default function Landing() {
  const [category, setCategory] = useState('fast-food');
  const menu = category === 'food' ? indianFood : fastFood;
  const showDelivery = category === 'delivery';
  return <main className="landing-page">
    <nav className="landing-nav"><Link to="/" className="landing-brand"><span className="brand-mark"><Truck size={19} /></span>FASTWAY</Link><div className="landing-links"><a href="#menu">Menu</a><a href="#how-it-works">How it works</a></div><Link to="/login" className="nav-login">Sign in <ArrowRight size={16} /></Link></nav>
    <section className="landing-hero"><div className="hero-copy"><p className="eyebrow">Fast food. Faster doorstep.</p><h1>Your cravings,<br /><em>on the way.</em></h1><p className="hero-text">From the first sizzle to your front door, FASTWAY keeps every bite moving.</p><Link to="/login" className="primary-btn hero-btn">Start an order <ArrowRight size={17} /></Link><div className="hero-trust"><span><span className="trust-dot"></span> 25 min average</span><span><span className="trust-dot orange-dot"></span> Live tracking</span></div></div><div className="hero-visual"><div className="sun-disc"></div><div className="hero-image-wrap"><img src="https://png.pngtree.com/png-vector/20241211/ourmid/pngtree-authentic-italian-pizza-with-cheese-and-fresh-vegetable-toppings-png-image_14714611.png" alt="Fresh Italian pizza ready for delivery" /></div><div className="floating-card order-card"><span className="mini-icon"><PackageCheck size={17} /></span><span><strong>Order on its way</strong><small>Arriving in 18 min</small></span><i></i></div><div className="floating-card location-card"><MapPin size={16} /><span>Downtown route<br /><strong>Moving now</strong></span></div></div></section>
    <section className="category-strip" id="how-it-works"><button className={category === 'fast-food' ? 'selected' : ''} onClick={() => setCategory('fast-food')}><Clock3 size={22} /><span><strong>Fast Food</strong><small>Pizza, burger and more</small></span></button><button className={category === 'food' ? 'selected' : ''} onClick={() => setCategory('food')}><PackageCheck size={22} /><span><strong>Food</strong><small>Fresh Indian favourites</small></span></button><button className={category === 'delivery' ? 'selected' : ''} onClick={() => setCategory('delivery')}><Send size={22} /><span><strong>Delivery</strong><small>Send anything anywhere</small></span></button></section>
    <section className="menu-section" id="menu"><div className="section-heading landing-heading"><div><p className="eyebrow">{showDelivery ? 'On-demand delivery' : category === 'food' ? 'Made with tradition' : 'Made for the moment'}</p><h2>{showDelivery ? 'Where should we deliver?' : category === 'food' ? 'Comfort in every plate' : 'Pick your kind of happy'}</h2></div><p>{showDelivery ? 'Tell us where to pick up and<br />where to take it.' : 'Good food has a way of<br />making the day better.'}</p></div>{showDelivery ? <DeliveryForm /> : <div className="food-grid">{menu.map((item) => <article className={`food-card ${item.tone}`} key={item.name}><div className="food-image"><FoodImage src={item.image} alt={item.name} /><span>{item.price}</span></div><div className="food-info"><div><h3>{item.name}</h3><p>{item.detail}</p></div><Link to="/login" aria-label={`Order ${item.name}`}><ArrowRight size={18} /></Link></div></article>)}</div>}</section>
    <footer className="landing-footer"><div className="landing-brand"><span className="brand-mark"><Truck size={17} /></span>FASTWAY</div><p>Fast. Reliable. Delivered.</p><div className="footer-links"><a href="#menu">Explore menu</a><Link to="/login">Partner login</Link></div><small>© 2026 FASTWAY Delivery System</small></footer>
  </main>;
}
