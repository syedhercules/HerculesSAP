import React, { useState, useEffect } from 'react';
import MaterialMappingForm from '../components/MaterialMappingForm';
import { useTheme } from '../context/ThemeContext';
import KpiCard from '../components/KpiCard';
import { FaCubes, FaChartLine, FaPercent } from 'react-icons/fa';

const MaterialMap = () => {
  const [mappings, setMappings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterLine, setFilterLine] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const { theme } = useTheme();

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Hide after 3 seconds
  };

  // 🔄 Fetch materials on mount
  const fetchMaterials = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/materials');
      const data = await res.json();
      setMappings(data);
    } catch (err) {
      console.error('Error fetching materials:', err);
      showNotification('Failed to fetch materials', 'error');
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filteredMappings = mappings.filter((m) => {
    const matchesSearch = m.material.toLowerCase().includes(search.toLowerCase());
    const matchesLine = filterLine ? m.packingLine === filterLine : true;
    return matchesSearch && matchesLine;
  });

  const uniqueLines = [...new Set(mappings.map((m) => m.packingLine))];

  const totalMaterials = mappings.length;
  const totalOutput = mappings.length * 100;
  const efficiency = mappings.length
    ? ((totalOutput / (mappings.length * 120)) * 100).toFixed(1)
    : 0;

  // ✅ Add material to backend and refresh from DB
  const handleAddMapping = async (newMapping) => {
    try {
      const res = await fetch('http://localhost:5000/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMapping),
      });

      if (res.ok) {
        showNotification('Material added successfully!');
        setModalOpen(false);
        await fetchMaterials(); // Refresh data from DB
      } else {
        const err = await res.json();
        console.error('Server error:', err);
        showNotification(err.error || 'Failed to add material', 'error');
      }
    } catch (error) {
      console.error('Failed to add material:', error);
      showNotification('Failed to add material', 'error');
    }
  };

  // Styling logic
  const bgMain = theme === 'light'
    ? 'bg-slate-100 text-slate-800'
    : 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white';
  const kpiCardStyles = [
    theme === 'light'
      ? 'bg-gradient-to-br from-blue-100 to-blue-300 border-slate-300 text-slate-900'
      : 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 text-white',
    theme === 'light'
      ? 'bg-gradient-to-br from-green-100 to-teal-200 border-slate-300 text-slate-900'
      : 'bg-gradient-to-br from-green-500 to-teal-500 border-green-400 text-white',
    theme === 'light'
      ? 'bg-gradient-to-br from-purple-100 to-fuchsia-200 border-slate-300 text-slate-900'
      : 'bg-gradient-to-br from-purple-500 to-fuchsia-600 border-purple-400 text-white',
  ];
  const filterInput = theme === 'light'
    ? 'bg-white text-slate-900 border border-slate-300 focus:ring-slate-300'
    : 'bg-[#0f172a] text-cyan-200 border border-cyan-500 focus:ring-cyan-400';
  const filterSelect = theme === 'light'
    ? 'bg-white text-slate-900 border border-slate-300 focus:ring-slate-300'
    : 'bg-[#0f172a] text-cyan-200 border border-cyan-500 focus:ring-cyan-400';
  const tableBg = theme === 'light'
    ? 'bg-white border border-slate-200 text-slate-900'
    : 'bg-[#1e293b] border border-cyan-500 text-cyan-200';
  const tableHeader = theme === 'light'
    ? 'bg-slate-100 text-slate-700 border-b border-slate-300'
    : 'bg-[#0f172a] text-cyan-300 border-b border-cyan-500';
  const tableRowEven = theme === 'light' 
    ? 'bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all duration-200'
    : 'bg-[#22304a]/60 hover:bg-[#2d4065] cursor-pointer transition-all duration-200';
  
  const tableRowOdd = theme === 'light'
    ? 'bg-white hover:bg-slate-100 cursor-pointer transition-all duration-200'
    : 'bg-[#1a2532] hover:bg-[#2d4065] cursor-pointer transition-all duration-200';

  const tableCellHighlight = theme === 'light'
    ? 'hover:text-slate-600 hover:font-semibold transition-all duration-200'
    : 'hover:text-cyan-300 hover:font-semibold transition-all duration-200';
  const modalBg = theme === 'light'
    ? 'bg-white border border-blue-300 text-blue-900'
    : 'bg-[#1e293b] border border-cyan-500 text-white';
  const closeBtn = theme === 'light'
    ? 'text-blue-400 hover:text-blue-600'
    : 'text-cyan-300 hover:text-cyan-100';

  return (
    <div className={`min-h-screen ${bgMain} p-6 font-mono flex flex-col items-center`}>
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ${
            notification.type === 'success'
              ? theme === 'light'
                ? 'bg-green-100 border border-green-500 text-green-700'
                : 'bg-green-500/20 border border-green-500 text-green-300'
              : theme === 'light'
              ? 'bg-red-100 border border-red-500 text-red-700'
              : 'bg-red-500/20 border border-red-500 text-red-300'
          }`}
        >
          {notification.message}
        </div>
      )}

      <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-slate-700' : 'text-cyan-400'}`}>
        Material to Line Mapping
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl mb-8">
        <KpiCard
          title="Total Materials"
          value={totalMaterials}
          unit=""
          Icon={FaCubes}
          color="#2563eb"
        />
        <KpiCard
          title="Total Output"
          value={totalOutput}
          unit=""
          Icon={FaChartLine}
          color="#059669"
        />
        <KpiCard
          title="Efficiency (%)"
          value={parseFloat(efficiency)}
          unit="%"
          Icon={FaPercent}
          color="#a21caf"
        />
      </div>

      {/* Add Button */}
      <div className="w-full max-w-6xl flex justify-end mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className={
            theme === 'light'
              ? 'bg-gradient-to-r from-green-200 to-teal-300 text-teal-900 font-bold px-6 py-2 rounded-md shadow hover:from-green-100 hover:to-teal-200 transition-all'
              : 'bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold px-6 py-2 rounded-md shadow-lg hover:from-green-400 hover:to-teal-400 transition-all'
          }
        >
          + Add Material
        </button>
      </div>

      {/* Filters */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${filterInput} rounded-md px-3 py-2 focus:outline-none focus:ring-2 w-full md:w-1/3`}
        />
        <select
          value={filterLine}
          onChange={(e) => setFilterLine(e.target.value)}
          className={`${filterSelect} rounded-md px-3 py-2 focus:outline-none focus:ring-2 w-full md:w-1/4`}
        >
          <option value="">All Packing Lines</option>
          {uniqueLines.map((line, i) => (
            <option key={i} value={line}>{line}</option>
          ))}
        </select>
      </div>

      {/* Material Count */}
      <div className="mb-3 w-full max-w-6xl flex justify-end pr-2">
        <span className={theme === 'light' ? 'text-slate-500 text-sm font-semibold' : 'text-cyan-300 text-sm font-semibold'}>
          Total Materials: {filteredMappings.length}
        </span>
      </div>

      {/* Mapping Table */}
      <div className={`overflow-x-auto rounded-2xl ${tableBg} shadow ${theme === 'light' ? 'hover:shadow-lg' : 'shadow-[0_0_24px_#00ffff44] hover:shadow-[0_0_32px_#00ffff66]'} w-full max-w-6xl transition-all duration-300`}>
        <table className={`min-w-full text-sm text-left font-mono ${theme === 'light' ? 'text-blue-900' : 'text-cyan-200'}`}>
          <thead className={`${tableHeader} uppercase text-xs tracking-wider sticky top-0 z-10`}>
            <tr>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Scale</th>
              <th className="px-4 py-3">Recipe</th>
              <th className="px-4 py-3">Packing Line</th>
            </tr>
          </thead>
          <tbody>
            {filteredMappings.map((map, idx) => (
              <tr
                key={idx}
                className={`transition-all duration-200 border-b ${
                  theme === 'light' ? 'border-blue-100' : 'border-slate-700'
                } ${idx % 2 === 0 ? tableRowEven : tableRowOdd}`}
              >
                <td className={`px-4 py-3 ${tableCellHighlight}`}>{map.material}</td>
                <td className={`px-4 py-3 ${tableCellHighlight}`}>{map.version}</td>
                <td className={`px-4 py-3 ${tableCellHighlight}`}>{map.scale}</td>
                <td className={`px-4 py-3 ${tableCellHighlight}`}>{map.recipe}</td>
                <td className={`px-4 py-3 ${tableCellHighlight}`}>{map.packingLine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className={`rounded-2xl p-8 min-w-[340px] max-w-lg w-full relative shadow-2xl ${modalBg}`}>
            <button
              onClick={() => setModalOpen(false)}
              className={`absolute top-3 right-3 text-xl font-bold ${closeBtn}`}
              aria-label="Close"
            >
              ×
            </button>
            <MaterialMappingForm onAdd={handleAddMapping} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialMap;
