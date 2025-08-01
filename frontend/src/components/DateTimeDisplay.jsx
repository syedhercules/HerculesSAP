import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={
        theme === 'light'
          ? 'bg-white border border-blue-200 text-right rounded-xl px-4 py-2 shadow-md min-w-[230px]'
          : 'bg-[#0f172a] border border-cyan-500 text-right rounded-xl px-4 py-2 shadow-[0_0_10px_#00ffff55] min-w-[230px]'
      }
    >
      <div
        className={
          theme === 'light'
            ? 'text-blue-900 font-semibold'
            : 'text-white font-semibold'
        }
      >
        {currentTime.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <div
        className={
          theme === 'light'
            ? 'text-blue-500 font-bold text-sm'
            : 'text-cyan-300 font-bold text-sm'
        }
      >
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DateTimeDisplay; 