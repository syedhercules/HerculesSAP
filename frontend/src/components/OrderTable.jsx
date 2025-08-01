import React from 'react';

const OrderTable = ({ orders, theme = 'dark' }) => {
  const tableBg = theme === 'light'
    ? 'bg-white border border-blue-200 text-gray-700'
    : 'bg-[#1e293b] border border-cyan-500 text-cyan-200';
  const tableHeader = theme === 'light'
    ? 'bg-blue-100 text-gray-700 border-b border-blue-300'
    : 'bg-[#0f172a] text-cyan-300 border-b border-cyan-500';
  const tableRowEven = theme === 'light' ? 'bg-blue-50' : 'bg-[#22304a]/60';
  const tableRowOdd = theme === 'light' ? 'bg-white' : 'bg-[#1a2532]';
  const borderRow = theme === 'light' ? 'border-blue-100' : 'border-slate-700';

  return (
    <div className={`overflow-x-auto rounded-lg ${tableBg} shadow`}>
      <table className={`min-w-full text-sm text-left font-mono ${theme === 'light' ? 'text-gray-700' : 'text-cyan-200'}`}>
        <thead className={`${tableHeader} uppercase text-xs tracking-wider`}>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Material</th>
            <th className="px-4 py-2">Version</th>
            <th className="px-4 py-2">Batch</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={order.id}
              className={`transition-colors duration-200 border-b ${borderRow} ${idx % 2 === 0 ? tableRowEven : tableRowOdd}`}
            >
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.material}</td>
              <td className="px-4 py-2">{order.version}</td>
              <td className="px-4 py-2">{order.batch}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    order.status === 'Completed'
                      ? theme === 'light'
                        ? 'bg-green-400 text-green-900'
                        : 'bg-green-600 text-white'
                      : order.status === 'Processing'
                        ? theme === 'light'
                          ? 'bg-blue-300 text-gray-700'
                          : 'bg-blue-600 text-white'
                        : theme === 'light'
                          ? 'bg-yellow-300 text-gray-700'
                          : 'bg-yellow-500 text-black'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
