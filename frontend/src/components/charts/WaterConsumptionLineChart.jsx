import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
 
} from 'recharts';

const data = [
  { time: '00:00', water: 5 },
  { time: '01:00', water: 4.8 },
  { time: '02:00', water: 6.2 },
  { time: '03:00', water: 5.5 },
  { time: '04:00', water: 6.0 },
];

const WaterConsumptionLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="time" stroke="#cbd5e1" />
        <YAxis stroke="#cbd5e1" unit=" m³" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#60a5fa' }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="water"
          stroke="#60a5fa"
          strokeWidth={3}
          dot={{ r: 4 }}
          name="Water (m³)"
        />
        <Area
          type="monotone"
          dataKey="water"
          stroke="none"
          fill="url(#colorWater)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WaterConsumptionLineChart;
