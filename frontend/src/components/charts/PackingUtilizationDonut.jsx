import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Used', value: 65 },
  { name: 'Idle', value: 20 },
  { name: 'Downtime', value: 15 },
];

const COLORS = ['#34d399', '#facc15', '#ef4444'];

const PackingUtilizationDonut = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#1e293b" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#34d399' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PackingUtilizationDonut;
