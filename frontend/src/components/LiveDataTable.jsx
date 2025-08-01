import React from 'react';

const LiveDataTable = ({ data, theme = 'dark' }) => {
  const tableBg = theme === 'light'
    ? 'bg-white border border-blue-200 text-[#222]'
    : 'bg-[#1e293b] border border-cyan-500 text-cyan-200';
  const tableHeader = theme === 'light'
    ? 'bg-blue-100 text-[#222] border-b border-blue-300'
    : 'bg-[#0f172a] text-cyan-300 border-b border-cyan-500';
  const tableRowEven = theme === 'light' ? 'bg-blue-50' : 'bg-[#22304a]/60';
  const tableRowOdd = theme === 'light' ? 'bg-white' : 'bg-[#1a2532]';
  const borderRow = theme === 'light' ? 'border-blue-100' : 'border-slate-700';

  return (
    <div className={`overflow-x-auto rounded-lg ${tableBg} shadow`}> 
      <table className={`min-w-full text-sm text-left font-mono ${theme === 'light' ? 'text-[#222]' : 'text-cyan-200'}`}>
        <thead className={`${tableHeader} uppercase text-xs tracking-wider`}>
          <tr>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Scale (kg)</th>
            <th className="px-4 py-2">Water Dosing (L)</th>
            <th className="px-4 py-2">Equipment Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`transition duration-150 border-b ${borderRow} ${idx % 2 === 0 ? tableRowEven : tableRowOdd}`}
            >
              <td className="px-4 py-2">{row.timestamp}</td>
              <td className="px-4 py-2">{row.scale.toFixed(1)}</td>
              <td className="px-4 py-2">{row.waterDosing.toFixed(1)}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    row.equipmentStatus === 'Running'
                      ? theme === 'light'
                        ? 'bg-green-400 text-green-900'
                        : 'bg-green-500 text-black'
                      : row.equipmentStatus === 'Paused'
                        ? theme === 'light'
                          ? 'bg-yellow-300 text-yellow-900'
                          : 'bg-yellow-400 text-black'
                        : theme === 'light'
                          ? 'bg-gray-300 text-gray-700'
                          : 'bg-gray-500 text-white'
                  }`}
                >
                  {row.equipmentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveDataTable;
