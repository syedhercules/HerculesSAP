
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const initialLogs = [
  {
    timestamp: '2025-06-03 07:00:00',
    source: 'Operator',
    action: 'Manual Sync Triggered',
    status: 'Success',
  },
  {
    timestamp: '2025-06-03 06:00:00',
    source: 'Hercules',
    action: 'Shift End Sync to SAP',
    status: 'Success',
  },
  {
    timestamp: '2025-06-03 03:00:00',
    source: 'SAP',
    action: 'Order Push to Hercules',
    status: 'Success',
  },
  {
    timestamp: '2025-06-03 02:59:00',
    source: 'SCADA',
    action: 'Data Push to Hercules',
    status: 'OK',
  },
  {
    timestamp: '2025-06-03 01:00:00',
    source: 'Operator',
    action: 'Manual Material Mapping Edit',
    status: 'Updated',
  },
];

const Logs = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [operator, setOperator] = useState('Operator A');
  const { theme } = useTheme();

  const getCurrentTimestamp = () => {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  };

  const handleManualSync = () => {
    const newLog = {
      timestamp: getCurrentTimestamp(),
      source: operator,
      action: 'Manual Sync Triggered',
      status: 'Success',
    };
    setLogs([newLog, ...logs]);
  };

  const handleShiftEnd = () => {
    if (window.confirm('Confirm shift end and sync to SAP?')) {
      const newLog = {
        timestamp: getCurrentTimestamp(),
        source: 'Hercules',
        action: 'Shift End Sync to SAP',
        status: 'Success',
      };
      setLogs([newLog, ...logs]);
    }
  };

  const handleUndo = (index) => {
    const removed = logs[index];
    const newLog = {
      timestamp: getCurrentTimestamp(),
      source: operator,
      action: `Undo: ${removed.action}`,
      status: 'Reverted',
    };
    const updatedLogs = logs.filter((_, i) => i !== index);
    setLogs([newLog, ...updatedLogs]);
  };

  const inputClass = theme === 'light'
    ? 'px-4 py-2 rounded bg-white border border-blue-300 text-[#222]'
    : 'px-4 py-2 rounded bg-[#0f172a] border border-cyan-500 text-cyan-200';
  const btnSync = theme === 'light'
    ? 'bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold shadow transition-all duration-150'
    : 'bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow transition-all duration-150';
  const btnEnd = theme === 'light'
    ? 'bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold shadow transition-all duration-150'
    : 'bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-bold shadow transition-all duration-150';
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
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] text-[#222] p-6 font-mono'
          : 'min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 font-mono'
      }
    >
      <h2 className={theme === 'light' ? 'text-2xl font-bold mb-6 text-[#222]' : 'text-2xl font-bold mb-6 text-cyan-400'}>Sync & Operator Logs</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          placeholder="Operator Name"
          className={inputClass}
        />
        <button
          onClick={handleManualSync}
          className={btnSync}
        >
          Manual Sync
        </button>
        <button
          onClick={handleShiftEnd}
          className={btnEnd}
        >
          End Shift
        </button>
      </div>

      <div className={`overflow-x-auto rounded-lg ${tableBg} shadow ${theme === 'light' ? '' : 'shadow-[0_0_15px_#00ffff44]'}`}>
        <table className={`min-w-full text-sm text-left font-mono ${theme === 'light' ? 'text-[#222]' : 'text-cyan-200'}`}>
          <thead className={`${tableHeader} uppercase text-xs tracking-wider`}>
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr
                key={idx}
                className={`transition duration-150 border-b ${borderRow} ${idx % 2 === 0 ? tableRowEven : tableRowOdd}`}
              >
                <td className="px-4 py-2">{log.timestamp}</td>
                <td className="px-4 py-2">{log.source}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      log.status === 'Success'
                        ? theme === 'light'
                          ? 'bg-green-400 text-green-900'
                          : 'bg-green-600 text-white'
                        : log.status === 'Updated'
                          ? theme === 'light'
                            ? 'bg-yellow-300 text-yellow-900'
                            : 'bg-yellow-400 text-black'
                          : log.status === 'Reverted'
                            ? theme === 'light'
                              ? 'bg-red-300 text-red-900'
                              : 'bg-red-400 text-black'
                            : theme === 'light'
                              ? 'bg-gray-300 text-gray-700'
                              : 'bg-gray-500 text-white'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {log.source === operator && log.status !== 'Reverted' && (
                    <button
                      onClick={() => handleUndo(idx)}
                      className={theme === 'light' ? 'text-red-600 hover:text-red-400 text-xs underline' : 'text-red-400 hover:text-red-200 text-xs underline'}
                    >
                      Undo
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
