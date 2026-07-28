import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar businessName="Bella Hair Studio" plan="Pro" />
      <Outlet />
    </div>
  );
}
