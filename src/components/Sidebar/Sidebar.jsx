import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/program-setup', label: 'Program Setup' },
  { to: '/customers', label: 'Customers' },
  { to: '/messages', label: 'WhatsApp Messages' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar({ businessName, plan, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">Loyalty<span>Tavern</span></div>
      {LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link--active' : '')}>
          {link.label}
        </NavLink>
      ))}
      <div className="sidebar__footer">
        {businessName}
        <br />
        {plan} plan
        <button onClick={onLogout} className="sidebar__link sidebar__logout">Logout</button>
      </div>
    </aside>
  );
}
