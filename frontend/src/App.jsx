// src/App.jsx
import './index.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import LiveMonitor from './pages/LiveMonitor';
import MaterialMap from './pages/MaterialMap';
import Logs from './pages/Logs';
import ScadaReadings from './pages/ScadaReadings';
import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import KpiCalculations from './pages/KpiCalculations';
import ProcessOrderValidation from './pages/ProcessOrderValidation';
import { ThemeProvider } from './context/ThemeContext';

import { useLenisScroll } from './hooks/useLenisScroll'; // ✅ Import hook

const App = () => {
  const lenis = useLenisScroll(); // ✅ Activate smooth scrolling globally

  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen">
          {/* Fixed Sidebar */}
          <Sidebar />

          {/* Main layout shifted by sidebar width */}
          <div className="flex flex-col flex-1 ml-60">
            {/* Fixed Topbar */}
            <Topbar />

            {/* Scrollable Content Area */}
            <main className="p-6 pt-4 mt-20 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/live" element={<LiveMonitor />} />
                <Route path="/materials" element={<MaterialMap />} />
                <Route path="/scada" element={<ScadaReadings />} />
                <Route path="/kpi-calculations" element={<KpiCalculations />} />
                <Route path="/order-validation" element={<ProcessOrderValidation />} />
                <Route path="/logs" element={<Logs />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
