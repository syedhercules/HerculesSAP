import React from 'react';
import asmLogo from '../assets/Asm_Logo.png';
import herculesLogo from '../assets/Hercules.png';
import herculesWhiteLogo from '../assets/HerculesWhite.png';
import { useTheme } from '../context/ThemeContext';

// Simple SVG icons for sun and moon
const SunIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400">
    <circle cx="12" cy="12" r="5" strokeWidth="2" />
    <path strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-300">
    <path strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
);

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const bg = theme === 'light'
    ? 'bg-slate-200 border-b border-slate-300'
    : 'bg-[#0f172a] border-b border-cyan-500 shadow-[0_2px_10px_#00ffff44]';
  const text = theme === 'light' ? 'text-slate-800' : 'text-white';
  const subText = theme === 'light' ? 'text-green-600' : 'text-green-400';
  const avatarBg = theme === 'light'
    ? 'bg-slate-700 text-white'
    : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white';
  const toggleBtn = theme === 'light'
    ? 'rounded-full p-2 border border-slate-400 bg-slate-300 hover:bg-slate-400 transition shadow-md focus:outline-none'
    : 'rounded-full p-2 border border-cyan-500 bg-[#1e293b] hover:bg-cyan-900 transition shadow-md focus:outline-none';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between w-full h-22 ${bg}`}
    >
      {/* Left: Hercules Logo and Title */}
      <div className="flex items-center gap-4">
        <div
          className={
            theme === 'light'
              ? 'p-2 rounded-xl bg-white shadow-lg ring-1 ring-slate-300 transition-all duration-300 ml-[-8px]'
              : 'p-2 rounded-xl bg-gray-900 shadow-lg ring-1 ring-blue-300 transition-all duration-300 ml-[-8px]'
          }
          style={
            theme === 'light'
              ? { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
              : { boxShadow: '0 0 8px #00ccff, 0 0 16px #00ccff' }
          }
        >
          <img src={theme === 'light' ? herculesWhiteLogo : herculesLogo} alt="Hercules Logo" className="h-16 w-auto" />
        </div>
        {/* Hercules-Sap Card */}
        <div
          className={
            theme === 'light'
              ? 'ml-4 px-4 py-2 rounded-xl bg-white text-gray-700 font-bold shadow border border-gray-200'
              : 'ml-4 px-4 py-2 rounded-xl bg-slate-800 text-cyan-200 font-bold shadow border border-cyan-700'
          }
        >
          Hercules-SAP
        </div>
      </div>

      {/* Right: Admin Info + Theme Toggle */}
      <div className="flex items-center gap-6">
        <div className={`text-sm ${text} text-right leading-tight`}>
          <div>Hello, <strong>Admin</strong></div>
          <div className={`text-xs ${subText}`}>Online • Shift A</div>
        </div>
        <div className={`${avatarBg} rounded-full w-10 h-10 flex items-center justify-center font-semibold shadow-md`}>
          AM
        </div>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className={toggleBtn}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <img src={asmLogo} alt="ASM Logo" className="h-12 w-auto" />
      </div>
    </header>
  );
};

export default Topbar;
