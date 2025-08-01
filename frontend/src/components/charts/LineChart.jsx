import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['06:00', '08:00', '10:00', '12:00', '14:00'],
  datasets: [
    {
      label: 'Water (m³)',
      data: [10.2, 12.5, 11.8, 13.1, 12.3],
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14, 165, 233, 0.2)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      // text: 'Water Consumption (Hourly)',
      font: { size: 16 },
    },
  },
};

export default function LineChart() {
  return (
    <div className="h-52 w-full flex items-center justify-center">
      <Line data={data} options={options} />
    </div>
  );
}
