
import React, { useState, useEffect } from 'react';
import OrderTable from '../components/OrderTable';
import SyncButton from '../components/SyncButton';
import { useTheme } from '../context/ThemeContext';

const mockOrders = [
  {
    id: 'PO-001',
    material: 'Flour A',
    version: 'v1.2',
    batch: 'BATCH-101',
    quantity: 5000,
    status: 'Queued',
    date: '2025-06-12',
  },
  {
    id: 'PO-002',
    material: 'Bran B',
    version: 'v1.1',
    batch: 'BATCH-102',
    quantity: 3000,
    status: 'Processing',
    date: '2025-06-10',
  },
  {
    id: 'PO-003',
    material: 'Whole Wheat',
    version: 'v1.0',
    batch: 'BATCH-103',
    quantity: 4500,
    status: 'Completed',
    date: '2025-06-01',
  },
];

const Orders = () => {
  const [orders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [filters, setFilters] = useState({
    id: '',
    material: '',
    status: '',
  });
  const [activeTab, setActiveTab] = useState('Daily');
  const { theme } = useTheme();

  // Apply filters based on inputs and tab
  const applyFilters = (tab = activeTab, filterState = filters) => {
    const today = new Date();
    const filtered = orders.filter((order) => {
      const matchFilters =
        (!filterState.id || order.id.includes(filterState.id)) &&
        (!filterState.material || order.material.includes(filterState.material)) &&
        (!filterState.status || order.status === filterState.status);

      const orderDate = new Date(order.date);
      const diffDays = (today - orderDate) / (1000 * 60 * 60 * 24);

      if (tab === 'Daily' && diffDays > 1) return false;
      if (tab === 'Weekly' && diffDays > 7) return false;
      if (tab === 'Monthly' && diffDays > 31) return false;

      return matchFilters;
    });

    setFilteredOrders(filtered);
  };

  // Update filters when inputs change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(activeTab, updated);
  };

  // Manually trigger view
  const handleView = () => {
    applyFilters();
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Auto update table when tab changes
  useEffect(() => {
    applyFilters();
  }, [activeTab]);

  const filterInput = theme === 'light'
    ? 'p-2 rounded bg-white border border-blue-300 text-blue-900 focus:ring-blue-300'
    : 'p-2 rounded bg-[#0f172a] border border-cyan-500 text-cyan-200 focus:ring-cyan-400';
  const filterSelect = theme === 'light'
    ? 'p-2 rounded bg-white border border-blue-300 text-blue-900 focus:ring-blue-300'
    : 'p-2 rounded bg-[#0f172a] border border-cyan-500 text-cyan-200 focus:ring-cyan-400';

  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] text-[#222] p-6 font-inter'
          : 'min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 font-inter'
      }
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={theme === 'light' ? 'text-2xl font-bold text-gray-700 tracking-wide' : 'text-2xl font-bold text-cyan-400 tracking-wide'}>SAP Process Orders</h2>
        <SyncButton onClick={() => alert('Manual sync triggered')} />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="Order ID"
          value={filters.id}
          onChange={handleFilterChange}
          className={filterInput}
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={filters.material}
          onChange={handleFilterChange}
          className={filterInput}
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className={filterSelect}
        >
          <option value="">All Statuses</option>
          <option value="Queued">Queued</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex space-x-2">
          <button
            onClick={handleView}
            className={
              theme === 'light'
                ? 'px-5 py-2 font-bold text-gray-100 bg-gradient-to-br from-blue-200 to-gray-400 border-2 border-blue-400 rounded-2xl hover:from-blue-300 hover:to-gray-500 shadow transition-all duration-300'
                : 'px-5 py-2 rounded font-bold text-white bg-gradient-to-br from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 shadow-[0_0_12px_#22d3ee] transition-all duration-300'
            }
          >
            View
          </button>
          <button
            onClick={handlePrint}
            className={
              theme === 'light'
                ? 'px-5 py-2 font-semibold text-gray-100 bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-900 rounded-2xl hover:from-gray-900 hover:to-black shadow transition-all duration-300'
                : 'px-5 py-2 rounded font-semibold text-white bg-gradient-to-br from-gray-600 via-gray-800 to-black hover:from-gray-500 hover:to-gray-700 shadow-[0_0_10px_#6b7280] transition-all duration-300'
            }
          >
            Print
          </button>
        </div>
      </div>

      {/* Time Tabs */}
      <div className="flex space-x-3 mb-4">
        {['Daily', 'Weekly', 'Monthly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 tracking-wide
              ${
                activeTab === tab
                  ? theme === 'light'
                    ? 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 shadow-md'
                    : 'bg-gradient-to-r from-slate-800 to-slate-900 text-cyan-200 shadow'
                  : theme === 'light'
                    ? 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 shadow'
                    : 'bg-[#1e293b] text-cyan-300 border border-cyan-500 hover:bg-[#273549] shadow-[0_0_6px_#00ffff33]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Orders Table Section */}
      <div
        className={
          theme === 'light'
            ? 'rounded-xl border border-blue-200 shadow bg-white p-4'
            : 'rounded-xl border border-cyan-500 shadow-[0_0_20px_#00ffff44] bg-[#1e293b] p-4'
        }
      >
        {/* Dynamic Heading */}
        <h3 className={theme === 'light' ? 'text-xl font-semibold text-gray-700 mb-4' : 'text-xl font-semibold text-cyan-300 mb-4'}>
          {activeTab} Orders
        </h3>
        <OrderTable orders={filteredOrders} theme={theme} />
      </div>
    </div>
  );
};

export default Orders;