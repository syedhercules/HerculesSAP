
import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Helper to lighten a hex color
function lightenColor(hex, percent) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const num = parseInt(hex, 16);
  let r = (num >> 16) + Math.round(255 * percent);
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * percent);
  let b = (num & 0x0000FF) + Math.round(255 * percent);
  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);
  return `rgb(${r},${g},${b})`;
}

const KpiCard = ({ title, value, unit, Icon, color, delta }) => {
  const { theme } = useTheme();

  const titleColor = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const valueColor = theme === 'light' ? 'text-slate-800' : 'text-white';
  const unitColor = theme === 'light' ? 'text-slate-500' : 'text-slate-400';
  const deltaColor = delta && delta.startsWith('+') ? 'text-green-500' : 'text-red-500';
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-[#1e293b]';

  return (
    <div
      className={`relative p-4 rounded-xl shadow-md transition-all duration-300 ${bgColor} border ${
        theme === 'light' ? 'border-gray-600 hover:shadow-lg' : 'border-cyan-500 hover:border-cyan-400'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className={`text-sm font-semibold ${titleColor}`}>{title}</span>
          <span className={`text-2xl font-bold mt-1 ${valueColor}`}>
            {value !== null && value !== undefined ? value.toFixed(2) : '0.00'}
            <span className={`ml-1 text-base font-medium ${unitColor}`}>{unit}</span>
          </span>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: color, boxShadow: `0 4px 12px -1px ${color}99` }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>
      {delta && <div className={`text-xs mt-2 font-semibold ${deltaColor}`}>{delta} vs last period</div>}
    </div>
  );
};

export default KpiCard;