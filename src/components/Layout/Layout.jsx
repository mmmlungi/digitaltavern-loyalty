import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

export default function Layout({ user, onLogout }) {
  return (
    <div className="app-shell">
      <Sidebar businessName={user?.business_name || 'Your Business'} plan={user?.subscription_plan || 'Trial'} onLogout={onLogout} />
      <Outlet />
    </div>
  );
}
