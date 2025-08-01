import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { HeatMapGrid } from 'react-grid-heatmap';

const xLabels = ['Shift A', 'Shift B', 'Shift C'];
const yLabels = ['Flour A', 'Flour B', 'Bran'];

const data = [
  [78, 81, 74],
  [82, 79, 76],
  [75, 77, 80],
];

const getColor = (value) => {
  const min = 70;
  const max = 85;
  const scale = (value - min) / (max - min);
  const red = Math.round(255 * scale);
  const green = Math.round(255 * (1 - scale));
  return `rgb(${red}, ${green}, 0)`;
};

const ExtractionHeatmap = () => {
  return (
    <div className="w-full h-[280px] overflow-auto text-sm font-semibold text-white">
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => `${value}%`}
        cellStyle={(_x, _y, value) => ({
          background: getColor(value),
          color: '#000',
          border: '1px solid #1e293b',
        })}
        cellHeight="50px"
        xLabelsStyle={() => ({
          color: '#cbd5e1',
          fontSize: '14px',
        })}
        yLabelsStyle={() => ({
          color: '#cbd5e1',
          fontSize: '14px',
        })}
      />
    </div>
  );
};

export default ExtractionHeatmap;
