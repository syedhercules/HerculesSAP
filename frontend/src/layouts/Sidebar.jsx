import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Gauge,
  PackageSearch,
  Factory,
  Wrench,
  BarChart2,
  FileBarChart,
  ClipboardCheck,
  Activity,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme } = useTheme();
  const navItems = [
    { name: 'Dashboard', to: '/', icon: <Gauge size={26} /> },
    { name: 'Material', to: '/materials', icon: <PackageSearch size={26} /> },
    { name: 'Production', to: '/live', icon: <Factory size={26} /> },
    { name: 'SCADA Readings', to: '/scada', icon: <Activity size={26} /> },
    { name: 'KPI Calculations', to: '/kpi-calculations', icon: <FileBarChart size={26} /> },
    { name: 'Order Validation', to: '/order-validation', icon: <ClipboardCheck size={26} /> },
    { name: 'Maintenance', to: '/logs', icon: <Wrench size={26} /> },
    { name: 'Reports', to: '/orders', icon: <BarChart2 size={26} /> },
  ];

  const sidebarBg = theme === 'light'
    ? 'bg-slate-200 border-r border-slate-300'
    : 'bg-[#0f172a] border-r border-cyan-500 shadow-[2px_0_10px_#00ffff44]';
  const navActive = theme === 'light'
    ? 'bg-slate-700 text-white shadow-lg'
    : 'bg-[#00d8ff] text-black shadow';
  const navInactive = theme === 'light'
    ? 'text-slate-600 hover:bg-slate-300 hover:text-slate-800'
    : 'text-slate-300 hover:bg-[#1e293b] hover:text-cyan-400';

  return (
    <aside className={`fixed top-0 left-0 w-64 h-screen pt-24 z-40 ${sidebarBg}`}>
      <nav className="flex flex-col gap-3 px-4 mt-2">
        {navItems.map(({ name, to, icon }) => (
          <NavLink
            to={to}
            key={name}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-lg font-semibold text-base transition-all duration-200
              ${isActive ? navActive : navInactive}`
            }
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

