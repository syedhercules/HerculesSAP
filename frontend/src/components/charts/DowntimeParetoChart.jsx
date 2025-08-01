import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { cause: 'Mechanical', frequency: 8, cumulative: 35 },
  { cause: 'Electrical', frequency: 6, cumulative: 61 },
  { cause: 'Changeover', frequency: 4, cumulative: 78 },
  { cause: 'No Material', frequency: 2, cumulative: 87 },
  { cause: 'Other', frequency: 2, cumulative: 100 },
];

const DowntimeParetoChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="cause" stroke="#cbd5e1" />
        <YAxis yAxisId="left" stroke="#f97316" />
        <YAxis yAxisId="right" orientation="right" stroke="#22d3ee" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#22d3ee' }} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="frequency"
          barSize={30}
          fill="#f97316"
          name="Downtime Frequency"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cumulative"
          stroke="#22d3ee"
          strokeWidth={3}
          dot={{ r: 4 }}
          name="Cumulative %"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DowntimeParetoChart;
