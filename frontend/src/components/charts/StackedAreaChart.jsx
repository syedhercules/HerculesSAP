import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { batch: 'B1', flour: 62, bran: 20, screenings: 3 },
  { batch: 'B2', flour: 60, bran: 18, screenings: 4 },
  { batch: 'B3', flour: 64, bran: 19, screenings: 2 },
  { batch: 'B4', flour: 63, bran: 21, screenings: 3 },
  { batch: 'B5', flour: 65, bran: 20, screenings: 2 },
];

const StackedAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorFlour" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorBran" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorScreenings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="batch" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#38bdf8' }} />
        <Legend />
        <Area type="monotone" dataKey="flour" stackId="1" stroke="#38bdf8" fill="url(#colorFlour)" />
        <Area type="monotone" dataKey="bran" stackId="1" stroke="#facc15" fill="url(#colorBran)" />
        <Area type="monotone" dataKey="screenings" stackId="1" stroke="#f472b6" fill="url(#colorScreenings)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;
