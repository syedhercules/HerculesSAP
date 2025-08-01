import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

const data = {
  labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00'],
  datasets: [
    {
      label: 'Mill Throughput (%)',
      data: [75, 78, 80, 82, 85, 87],
      fill: true,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: '#22c55e',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      // text: 'Mill Throughput Trend',
      font: { size: 16 },
    },
  },
};

export default function AreaChart() {
  return (
    <div className="h-52 w-full flex items-center justify-center">
      <Line data={data} options={options} />
    </div>
  );
}
