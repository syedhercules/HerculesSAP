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
  { date: 'Mon', downtime: 2.1 },
  { date: 'Tue', downtime: 1.6 },
  { date: 'Wed', downtime: 3.0 },
  { date: 'Thu', downtime: 2.4 },
  { date: 'Fri', downtime: 1.2 },
];

const DowntimeTimelineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="date" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" unit=" hrs" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#f87171' }} />
        <Legend />
        <Bar dataKey="downtime" fill="#f87171" barSize={30} name="Downtime (hrs)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DowntimeTimelineChart;
