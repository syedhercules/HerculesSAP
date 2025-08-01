import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Bags Packed',
      data: [1200, 1350, 1100, 1450, 1300],
      backgroundColor: '#6366f1',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      // text: 'Daily Packing Output',
      font: { size: 16 },
    },
    legend: {
      display: false,
    },
  },
};

export default function BarChart() {
  return (
    <div className="h-52 w-full flex items-center justify-center">
      <Bar data={data} options={options} />
    </div>
  );
}
