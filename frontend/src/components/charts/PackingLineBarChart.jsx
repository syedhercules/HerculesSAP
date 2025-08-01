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
  { line: 'Line 1', output: 320 },
  { line: 'Line 2', output: 280 },
  { line: 'Line 3', output: 360 },
  { line: 'Line 4', output: 300 },
];

const PackingLineBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart layout="vertical" data={data} margin={{ left: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis type="number" stroke="#cbd5e1" />
        <YAxis dataKey="line" type="category" stroke="#cbd5e1" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#a78bfa' }} />
        <Legend />
        <Bar dataKey="output" fill="#a78bfa" barSize={20} name="Bags/Day" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PackingLineBarChart;
