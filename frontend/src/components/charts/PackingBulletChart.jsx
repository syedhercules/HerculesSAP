import React from 'react';

const PackingBulletChart = () => {
  const actual = 780;
  const target = 1000;
  const percentage = Math.min((actual / target) * 100, 100);

  return (
    <div className="w-full h-32 flex flex-col justify-center space-y-2">
      <div className="flex justify-between text-sm text-cyan-300 px-1">
        <span>Target: {target} bags</span>
        <span>Actual: {actual} bags</span>
      </div>
      <div className="relative w-full h-6 rounded bg-gray-800 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded bg-green-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="absolute top-0 left-[80%] h-full w-1 bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
          title="Target Marker"
        ></div>
      </div>
    </div>
  );
};

export default PackingBulletChart;
