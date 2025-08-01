import React, { useState, useEffect } from 'react';
import LiveDataTable from '../components/LiveDataTable';
import { useTheme } from '../context/ThemeContext';

const mockScadaData = [
  {
    timestamp: '2025-06-03 17:15:00',
    scale: 1240.5,
    waterDosing: 38.2,
    equipmentStatus: 'Running',
  },
  {
    timestamp: '2025-06-03 17:16:00',
    scale: 1285.7,
    waterDosing: 40.1,
    equipmentStatus: 'Running',
  },
  {
    timestamp: '2025-06-03 17:17:00',
    scale: 1222.4,
    waterDosing: 37.8,
    equipmentStatus: 'Paused',
  },
];

const LiveMonitor = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate polling every 5 seconds
    const interval = setInterval(() => {
      setData(mockScadaData); // Simulate dynamic updates
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] text-[#222] p-6 font-mono'
          : 'min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 font-mono'
      }
    >
      <h2
        className={
          theme === 'light'
            ? 'text-2xl font-bold text-[#222] mb-6'
            : 'text-2xl font-bold text-cyan-400 mb-6'
        }
      >
        Live SCADA Monitor
      </h2>

      <div
        className={
          theme === 'light'
            ? 'rounded-xl border border-blue-200 shadow bg-white p-4'
            : 'rounded-xl border border-cyan-500 shadow-[0_0_20px_#00ffff55] bg-[#1e293b] p-4'
        }
      >
        <LiveDataTable data={data} theme={theme} />
      </div>
    </div>
  );
};

export default LiveMonitor;
