import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { batch: 'B1', throughput: 70, efficiency: 58 },
  { batch: 'B2', throughput: 75, efficiency: 62 },
  { batch: 'B3', throughput: 72, efficiency: 59 },
  { batch: 'B4', throughput: 74, efficiency: 61 },
  { batch: 'B5', throughput: 73, efficiency: 60 },
];

const MultiLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="batch" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#22d3ee' }} />
        <Legend />
        <Line type="monotone" dataKey="throughput" stroke="#22d3ee" strokeWidth={3} name="Throughput (%)" />
        <Line type="monotone" dataKey="efficiency" stroke="#34d399" strokeWidth={3} name="Time Efficiency (%)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiLineChart;
