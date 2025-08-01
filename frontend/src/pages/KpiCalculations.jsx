import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useScada } from '../context/ScadaContext';
import { useTheme } from '../context/ThemeContext';
import {
  Package,
  Settings2,
  Clock3,
  CalendarClock,
  TimerReset,
  XCircle,
  CheckCircle,
  Layers3,
  PanelTopClose,
  Wheat,
  Droplet,
  BarChartBig,
  Gauge,
  ListOrdered,
  LayoutGrid,
  PercentCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const TabButton = ({ label, activeTab, setActiveTab, theme }) => (
  <button
    className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-t-md transition-all duration-200 ${
      activeTab === label
        ? theme === 'light'
          ? 'bg-[#444] text-white shadow'
          : 'bg-cyan-500 text-white shadow-lg'
        : theme === 'light'
          ? 'bg-[#f3f4f6] text-[#222] hover:bg-[#e5e7eb]'
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
    }`}
    onClick={() => setActiveTab(label)}
  >
    {label}
  </button>
);

const DataRow = ({ label, value, icon: Icon, theme }) => (
  <div
    className={
      theme === 'light'
        ? 'flex justify-between items-start px-3 py-2 mb-1 rounded bg-blue-50 text-[#222] border border-blue-200 shadow'
        : 'flex justify-between items-start px-3 py-2 mb-1 rounded bg-[#111827] text-cyan-300 border border-cyan-500 shadow-[0_0_10px_#00ffff44]'
    }
  >
    <div className="flex items-center gap-2 w-[70%]">
      {Icon && <Icon className={theme === 'light' ? 'w-4 h-4 text-[#222]' : 'w-4 h-4 text-cyan-400'} />}
      <span className="text-sm break-words">{label}</span>
    </div>
    <span className={theme === 'light' ? 'text-base font-bold text-[#222] text-right' : 'text-base font-bold text-white text-right'}>
      {parseFloat(value || 0).toFixed(2)}
    </span>
  </div>
);

const KpiRow = ({ label, value, unit = '%', icon: Icon, theme }) => (
  <div
    className={
      theme === 'light'
        ? 'flex justify-between items-start py-2 px-3 mb-1 bg-blue-50 rounded text-[#222] border border-blue-200 shadow'
        : 'flex justify-between items-start py-2 px-3 mb-1 bg-[#0F172A] rounded text-cyan-200 border border-cyan-400 shadow-[0_0_8px_#00ffff33]'
    }
  >
    <div className="flex items-center gap-2 w-[70%]">
      {Icon && <Icon className={theme === 'light' ? 'w-4 h-4 text-[#222]' : 'w-4 h-4 text-cyan-300'} />}
      <span className="text-sm break-words">{label}</span>
    </div>
    <strong className={theme === 'light' ? 'text-[#222] text-right whitespace-nowrap' : 'text-white text-right whitespace-nowrap'}>
      {value !== null && value !== undefined
        ? parseFloat(value).toFixed(2) + unit
        : 'N/A'}
    </strong>
  </div>
);

const KpiCalculations = () => {
  const [activeTab, setActiveTab] = useState('Milling');
  const { scadaData } = useScada();
  const [millingKpis, setMillingKpis] = useState({});
  const [packingKpis, setPackingKpis] = useState({});
  const { theme } = useTheme();
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/kpi')
      .then((res) => {
        const millMap = {
          'Mill Throughput (%)': 'millThroughput',
          'Mill Time Efficiency (%)': 'millTimeEfficiency',
          'Total Utilization (%)': 'millUtilization',
          'Milling Gain': 'millingGain',
          'Screening Ratios': 'screeningRatios',
          'Water Consumption (m³)': 'waterConsumption',
          'Extraction Rates (%)': 'extractionRates',
          'Milling Loss (%)': 'millingLoss',
          'Net Hours (hrs)': 'millingNetHours',
          'Downtime (hrs)': 'millingDowntime',
        };
        const packMap = {
          'Packing Line Capacity (bags/hr)': 'lineCapacity',
          'Daily Packing Output (bags)': 'dailyOutput',
          'Net Hours (hrs)': 'packingNetHours',
          'Downtime (hrs)': 'packingDowntime',
          'Machine Utilization (%)': 'machineUtilization',
        };
        const normalize = (obj, map) =>
          Object.entries(obj || {}).reduce((acc, [key, val]) => {
            if (map[key]) acc[map[key]] = val;
            return acc;
          }, {});
        setMillingKpis(normalize(res.data.milling_kpis, millMap));
        setPackingKpis(normalize(res.data.packing_kpis, packMap));
      })
      .catch((err) => {
        console.error('Failed to fetch KPIs from backend:', err);
      });
  }, []);
  const flour = scadaData.flour || 0;
  const bran = scadaData.bran || 0;
  const screenings = scadaData.screenings || 0;
  const waterUsed = scadaData.waterUsed || 0;
  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-slate-100 text-[#222] p-6 font-inter'
          : 'min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 font-inter'
      }
    >
      <h1
        className={
          theme === 'light'
            ? 'text-2xl font-bold mb-6 text-[#222]'
            : 'text-2xl font-bold mb-6 text-cyan-400'
        }
      >
        KPI Calculations (Live from SCADA)
      </h1>
      <div className="flex space-x-2 mb-4">
        <TabButton label="Milling" activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
        <TabButton label="Packing" activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
      </div>
      {activeTab === 'Milling' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={
              theme === 'light'
                ? 'p-4 rounded-xl bg-white border border-slate-200 shadow'
                : 'p-4 rounded-xl bg-[#1E293B] border border-cyan-500 shadow-md'
            }
          >
            <h2
              className={
                theme === 'light'
                  ? 'text-lg font-semibold mb-4 text-[#222]'
                  : 'text-lg font-semibold mb-4 text-cyan-300'
              }
            >
              Milling Inputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ['Actual Output (t)', scadaData.actualOutput, Package],
                ['Standard Capacity (t)', scadaData.standardCapacity, Settings2],
                ['Net Running Hours', scadaData.netRunningHours, Clock3],
                ['Total Available Hours', scadaData.totalAvailableHours, CalendarClock],
                ['Planned Downtime (hrs)', scadaData.plannedDowntime, TimerReset],
                ['Total Downtime (hrs)', scadaData.totalDowntime, XCircle],
                ['Good Output (t)', scadaData.goodOutput, CheckCircle],
                ['Total Output (t)', scadaData.totalOutput, Layers3],
                ['Planned Output (t)', scadaData.plannedOutput, PanelTopClose],
                ['Flour (t)', flour, Wheat],
                ['Bran (t)', bran, Layers3],
                ['Screenings (t)', screenings, Layers3],
                ['Water Used (m³)', waterUsed, Droplet],
              ].map(([label, value, Icon]) => (
                <DataRow key={label} label={label} value={value} icon={Icon} theme={theme} />
              ))}
            </div>
          </div>
          <div
            className={
              theme === 'light'
                ? 'p-4 rounded-xl bg-white border border-slate-200 shadow'
                : 'p-4 rounded-xl bg-[#1E293B] border border-cyan-500 shadow-md'
            }
          >
            <h2
              className={
                theme === 'light'
                  ? 'text-lg font-semibold mb-4 text-[#222]'
                  : 'text-lg font-semibold mb-4 text-cyan-300'
              }
            >
              Milling KPIs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <KpiRow label="Mill Throughput" value={millingKpis.millThroughput} icon={TrendingUp} theme={theme} />
              <KpiRow label="Mill Time Efficiency" value={millingKpis.millTimeEfficiency} icon={Clock3} theme={theme} />
              <KpiRow label="Total Utilization" value={millingKpis.millUtilization} icon={Gauge} theme={theme} />
              <KpiRow label="Milling Gain" value={millingKpis.millingGain} icon={PercentCircle} theme={theme} />
              <KpiRow label="Screening Ratios" value={millingKpis.screeningRatios} icon={LayoutGrid} theme={theme} />
              <KpiRow label="Water Consumption" value={millingKpis.waterConsumption} unit=" m³" icon={Droplet} theme={theme} />
              <KpiRow label="Extraction Rates" value={millingKpis.extractionRates} icon={BarChartBig} theme={theme} />
              <KpiRow label="Milling Loss" value={millingKpis.millingLoss} icon={TrendingDown} theme={theme} />
              <KpiRow label="Net Hours" value={millingKpis.millingNetHours} unit=" hrs" icon={Clock3} theme={theme} />
              <KpiRow label="Downtime" value={millingKpis.millingDowntime} unit=" hrs" icon={XCircle} theme={theme} />
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Packing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={
              theme === 'light'
                ? 'p-4 rounded-xl bg-white border border-slate-200 shadow'
                : 'p-4 rounded-xl bg-[#1E293B] border border-cyan-500 shadow-md'
            }
          >
            <h2
              className={
                theme === 'light'
                  ? 'text-lg font-semibold mb-4 text-[#222]'
                  : 'text-lg font-semibold mb-4 text-cyan-300'
              }
            >
              Packing Inputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ['Actual Packing Output (t)', scadaData.actualPackingOutput, Package],
                ['Packing Standard Capacity (t)', scadaData.packingStdCapacity, Settings2],
                ['Packing Good Output (t)', scadaData.packingGoodOutput, CheckCircle],
                ['Packing Total Output (t)', scadaData.packingTotalOutput, Layers3],
                ['Packing Planned Output (t)', scadaData.packingPlannedOutput, PanelTopClose],
                ['Packing Net Hours', scadaData.packingNetHours, Clock3],
                ['Packing Total Hours', scadaData.packingTotalHours, CalendarClock],
              ].map(([label, value, Icon]) => (
                <DataRow key={label} label={label} value={value} icon={Icon} theme={theme} />
              ))}
            </div>
          </div>
          <div
            className={
              theme === 'light'
                ? 'p-4 rounded-xl bg-white border border-slate-200 shadow'
                : 'p-4 rounded-xl bg-[#1E293B] border border-cyan-500 shadow-md'
            }
          >
            <h2
              className={
                theme === 'light'
                  ? 'text-lg font-semibold mb-4 text-[#222]'
                  : 'text-lg font-semibold mb-4 text-cyan-300'
              }
            >
              Packing KPIs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <KpiRow label="Packing Line Capacity" value={packingKpis.lineCapacity} unit=" bags/hr" icon={ListOrdered} theme={theme} />
              <KpiRow label="Daily Packing Output" value={packingKpis.dailyOutput} unit=" bags" icon={BarChartBig} theme={theme} />
              <KpiRow label="Net Hours" value={packingKpis.packingNetHours} unit=" hrs" icon={Clock3} theme={theme} />
              <KpiRow label="Downtime" value={packingKpis.packingDowntime} unit=" hrs" icon={TimerReset} theme={theme} />
              <KpiRow label="Machine Utilization" value={packingKpis.machineUtilization} unit="%" icon={Gauge} theme={theme} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default KpiCalculations;