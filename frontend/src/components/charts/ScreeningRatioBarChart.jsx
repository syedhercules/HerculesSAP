import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { batch: 'B1', screeningRatio: 3.5 },
  { batch: 'B2', screeningRatio: 4.2 },
  { batch: 'B3', screeningRatio: 2.9 },
  { batch: 'B4', screeningRatio: 4.7 },
  { batch: 'B5', screeningRatio: 3.1 },
];

const ScreeningRatioBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="batch" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#f97316' }} />
        <Legend />
        <Bar dataKey="screeningRatio" fill="#f97316" name="Screening Ratio (%)" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScreeningRatioBarChart;
