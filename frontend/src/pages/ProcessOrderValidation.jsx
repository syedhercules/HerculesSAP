import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import KpiCard from '../components/KpiCard';
import { ListOrdered, CheckCircle, XCircle, Clock3 } from 'lucide-react';

const mockOrders = [
  { id: 'PO-001', material: 'Flour A', version: 'v1.2', batch: 'B-101', quantity: 5000, status: 'Pending' },
  { id: 'PO-002', material: 'Bran B', version: 'v1.0', batch: 'B-102', quantity: 3200, status: 'Validated' },
  { id: 'PO-003', material: 'Semolina', version: 'v2.1', batch: 'B-103', quantity: 2100, status: 'Rejected' },
  { id: 'PO-004', material: 'Flour B', version: 'v1.3', batch: 'B-104', quantity: 4500, status: 'Pending' },
  { id: 'PO-005', material: 'Bran C', version: 'v1.2', batch: 'B-105', quantity: 1800, status: 'Validated' },
  { id: 'PO-006', material: 'Flour C', version: 'v2.0', batch: 'B-106', quantity: 3900, status: 'Rejected' },
  { id: 'PO-007', material: 'Semolina', version: 'v2.2', batch: 'B-107', quantity: 2500, status: 'Pending' },
  { id: 'PO-008', material: 'Flour D', version: 'v1.1', batch: 'B-108', quantity: 4100, status: 'Validated' },
  { id: 'PO-009', material: 'Bran D', version: 'v1.0', batch: 'B-109', quantity: 1700, status: 'Rejected' },
  { id: 'PO-010', material: 'Flour E', version: 'v1.4', batch: 'B-110', quantity: 5200, status: 'Pending' },
];

const statusOptions = ['All', 'Pending', 'Validated', 'Rejected'];

const ProcessOrderValidation = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState('All');
  const { theme } = useTheme();

  // KPI calculations
  const totalOrders = orders.length;
  const validatedOrders = orders.filter((o) => o.status === 'Validated').length;
  const rejectedOrders = orders.filter((o) => o.status === 'Rejected').length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  // Filtered orders for table
  const filteredOrders =
    statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter);

  const updateStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const tableBg = theme === 'light'
    ? 'bg-white border border-blue-200 text-[#222]'
    : 'bg-[#1e293b] border border-cyan-500 text-cyan-200';
  const tableHeader = theme === 'light'
    ? 'bg-blue-100 text-[#222] border-b border-blue-300'
    : 'bg-[#0f172a] text-cyan-300 border-b border-cyan-500';
  const tableRowEven = theme === 'light' ? 'bg-blue-50' : 'bg-[#22304a]/60';
  const tableRowOdd = theme === 'light' ? 'bg-white' : 'bg-[#1a2532]';
  const borderRow = theme === 'light' ? 'border-blue-100' : 'border-slate-700';
  const filterSelect = theme === 'light'
    ? 'bg-white text-[#222] border border-blue-300 focus:ring-blue-300'
    : 'bg-[#0f172a] text-cyan-200 border border-cyan-500 focus:ring-cyan-400';

  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] text-[#222] p-6 font-mono'
          : 'min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 font-mono'
      }
    >
      <h1
        className={
          theme === 'light'
            ? 'text-2xl font-bold mb-6 text-[#222]'
            : 'text-2xl font-bold mb-6 text-cyan-400'
        }
      >
        Process Order Validation
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
        <KpiCard
          title="Total Orders"
          value={totalOrders}
          unit=""
          Icon={ListOrdered}
          color="#2563eb"
        />
        <KpiCard
          title="Validated"
          value={validatedOrders}
          unit=""
          Icon={CheckCircle}
          color="#059669"
        />
        <KpiCard
          title="Rejected"
          value={rejectedOrders}
          unit=""
          Icon={XCircle}
          color="#e11d48"
        />
        <KpiCard
          title="Pending"
          value={pendingOrders}
          unit=""
          Icon={Clock3}
          color="#f59e42"
        />
      </div>

      {/* Filter by Status */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <label htmlFor="statusFilter" className="text-sm font-semibold opacity-80">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${filterSelect} rounded-md px-3 py-2 focus:outline-none focus:ring-2 w-full`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`overflow-x-auto rounded-lg ${tableBg} shadow ${theme === 'light' ? '' : 'shadow-[0_0_20px_#00ffff55]'}`}>
        <table className={`min-w-full text-sm text-left font-mono ${theme === 'light' ? 'text-[#222]' : 'text-cyan-200'}`}>
          <thead className={`${tableHeader} uppercase text-xs tracking-wider`}>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Material</th>
              <th className="px-4 py-2">Version</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`transition duration-150 border-b ${borderRow} ${index % 2 === 0 ? tableRowEven : tableRowOdd}`}
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.material}</td>
                <td className="px-4 py-2">{order.version}</td>
                <td className="px-4 py-2">{order.batch}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className={theme === 'light' ? 'px-4 py-2 font-semibold text-[#222]' : 'px-4 py-2 font-semibold text-yellow-300'}>{order.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => updateStatus(orders.findIndex((o) => o.id === order.id), 'Validated')}
                    className={
                      theme === 'light'
                        ? 'px-4 py-1 text-xs font-bold text-white bg-green-600 rounded-full shadow hover:bg-green-700 transition-all duration-150'
                        : 'px-4 py-1 text-xs font-bold text-white bg-green-500 rounded-full shadow hover:bg-green-600 transition-all duration-150'
                    }
                  >
                    Validate
                  </button>
                  <button
                    onClick={() => updateStatus(orders.findIndex((o) => o.id === order.id), 'Rejected')}
                    className={
                      theme === 'light'
                        ? 'px-4 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow hover:bg-red-700 transition-all duration-150'
                        : 'px-4 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow hover:bg-red-600 transition-all duration-150'
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessOrderValidation;
