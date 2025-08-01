import React, { useRef, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart() {
  const chartRef = useRef();
  const [gradient, setGradient] = useState([]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const grad = ctx.createLinearGradient(0, 0, 200, 200);
    grad.addColorStop(0, '#60a5fa'); // sky blue
    grad.addColorStop(1, '#1e3a8a'); // deep blue

    setGradient([grad, grad, grad]);
  }, []);

  const data = {
    labels: ['Line 1', 'Line 2', 'Line 3'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: gradient,
        borderColor: '#0f172a',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#00ffff', // 🌟 Neon text for legend labels
          font: {
            weight: 'bold',
            size: 13,
          },
        },
      },
      title: {
        display: true,
        // text: 'Machine Utilization',
        color: '#67e8f9',
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="h-52 w-full flex items-center justify-center">
      <Pie ref={chartRef} data={data} options={options} />
    </div>
  );
}
