
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KpiCard from '../components/KpiCard';
import {
  ActivitySquare,
  Clock,
  TrendingUp,
  PackageCheck,
  GaugeCircle,
  Thermometer,
  FlaskConical,
  Droplets,
  Loader2,
  Hourglass,
  ListOrdered,
  LayoutPanelLeft,
  Scale,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// Chart Components
import MultiLineChart from '../components/charts/MultiLineChart';
import StackedAreaChart from '../components/charts/StackedAreaChart';
import ScreeningRatioBarChart from '../components/charts/ScreeningRatioBarChart';
import WaterConsumptionLineChart from '../components/charts/WaterConsumptionLineChart';
import ExtractionHeatmap from '../components/charts/ExtractionHeatmap';
import PackingLineBarChart from '../components/charts/PackingLineBarChart';
import PackingUtilizationDonut from '../components/charts/PackingUtilizationDonut';
import DowntimeTimelineChart from '../components/charts/DowntimeTimelineChart';
import DowntimeParetoChart from '../components/charts/DowntimeParetoChart';
import PackingBulletChart from '../components/charts/PackingBulletChart';
import { useLenisScroll } from '../hooks/useLenisScroll';
import DateTimeDisplay from '../components/DateTimeDisplay';

const Dashboard = () => {
  useLenisScroll();
  const [activeTab, setActiveTab] = useState('Milling');
  const [millingKpis, setMillingKpis] = useState({});
  const [packingKpis, setPackingKpis] = useState({});
  const { theme } = useTheme();

  // Fetch KPIs function
  const fetchKpis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kpi');
      const { milling_kpis, packing_kpis } = response.data;
      setMillingKpis(milling_kpis);
      setPackingKpis(packing_kpis);
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
    }
  };

  useEffect(() => {
    fetchKpis();
    // Fetch KPIs every minute (removed as per user request)
    // const interval = setInterval(fetchKpis, 60000);
    // return () => clearInterval(interval);
  }, []);

  const millingKpiCards = [
    { title: 'Mill Throughput', value: millingKpis['Mill Throughput (%)'], unit: '%', icon: ActivitySquare, color: '#2563eb' },
    { title: 'Mill Time Efficiency', value: millingKpis['Mill Time Efficiency (%)'], unit: '%', icon: Clock, color: '#06b6d4' },
    { title: 'Total Utilization', value: millingKpis['Total Utilization (%)'], unit: '%', icon: TrendingUp, color: '#a21caf' },
    { title: 'Milling Gain', value: millingKpis['Milling Gain'], unit: '%', icon: GaugeCircle, color: '#22c55e' },
    { title: 'Screening Ratios', value: millingKpis['Screening Ratios'], unit: '%', icon: FlaskConical, color: '#f59e42' },
    { title: 'Water Consumption', value: millingKpis['Water Consumption (m³)'], unit: 'm³', icon: Droplets, color: '#0ea5e9' },
    { title: 'Extraction Rates', value: millingKpis['Extraction Rates (%)'], unit: '%', icon: Thermometer, color: '#eab308' },
    { title: 'Milling Loss', value: millingKpis['Milling Loss (%)'], unit: '%', icon: Loader2, color: '#64748b' },
    { title: 'Net Hours & Downtime', value: millingKpis['Net Hours (hrs)'], unit: 'hrs', icon: Hourglass, color: '#14b8a6' },
  ];

  const packingKpiCards = [
    { title: 'Packing Line Capacity', value: packingKpis['Packing Line Capacity (bags/hr)'], unit: 'bags/hr', icon: ListOrdered, color: '#f59e42' },
    { title: 'Daily Packing Output', value: packingKpis['Daily Packing Output (bags)'], unit: 'bags', icon: PackageCheck, color: '#a21caf' },
    { title: 'Net Hours & Downtime', value: packingKpis['Net Hours (hrs)'], unit: 'hrs', icon: LayoutPanelLeft, color: '#64748b' },
    { title: 'Machine Utilization', value: packingKpis['Machine Utilization (%)'], unit: '%', icon: Scale, color: '#22c55e' },
  ];

  const ChartCard = ({ title, children, theme }) => (
    <div
      className={
        theme === 'light'
          ? 'bg-white p-4 rounded-xl border border-slate-200 shadow-md'
          : 'bg-[#1e293b] p-4 rounded-xl border border-cyan-500 shadow-[0_0_15px_#00ffff55]'
      }
    >
      <h2
        className={
          theme === 'light'
            ? 'text-lg font-semibold text-slate-700 mb-2'
            : 'text-lg font-semibold text-cyan-400 mb-2'
        }
      >
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] text-[#222] p-6 font-inter space-y-8'
          : 'min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 font-inter space-y-8'
      }
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        {/* Left: Title + Tabs */}
        <div>
          <h1
            className={
              theme === 'light'
                ? 'text-3xl font-bold text-slate-800 tracking-wide mb-2'
                : 'text-3xl font-bold text-cyan-400 tracking-wide  mb-2'
            }
          >
            Real-Time Production Insights
          </h1>
          <div className="flex space-x-4">
            {['Milling', 'Packing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-semibold tracking-wide transition-all duration-300
                  ${
                    activeTab === tab
                      ? theme === 'light'
                        ? 'bg-slate-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black '
                      : theme === 'light'
                        ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow'
                        : 'bg-[#0f172a] text-cyan-300 border border-cyan-500 hover:bg-[#1e293b] shadow-[0_0_6px_#00ffff33]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Refresh Button + DateTime Card */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchKpis}
            className={
              theme === 'light'
                ? 'flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition'
                : 'flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold shadow hover:bg-cyan-400 transition'
            }
            title="Refresh KPIs"
          >
            <RotateCcw size={18} />
            Manual Sync
          </button>
          <DateTimeDisplay />
        </div>
      </div>

      {/* Milling Tab */}
      {activeTab === 'Milling' && (
        <>
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {millingKpiCards.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value || 0}
                unit={kpi.unit}
                Icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <ChartCard title="Throughput vs Time Efficiency" theme={theme}>
              <MultiLineChart />
            </ChartCard>
            <ChartCard title="Milling Output Composition" theme={theme}>
              <StackedAreaChart />
            </ChartCard>
            <ChartCard title="Screening Ratios by Batch" theme={theme}>
              <ScreeningRatioBarChart />
            </ChartCard>
            <ChartCard title="Water Consumption (Hourly)" theme={theme}>
              <WaterConsumptionLineChart />
            </ChartCard>
            <ChartCard title="Extraction Rates by Shift & Material" theme={theme}>
              <ExtractionHeatmap />
            </ChartCard>
          </div>
        </>
      )}

      {/* Packing Tab */}
      {activeTab === 'Packing' && (
        <>
          {/* KPI Cards for Packing */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3">
            {packingKpiCards.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value || 0}
                unit={kpi.unit}
                Icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Chart Components for Packing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <ChartCard title="Packing Output by Line" theme={theme}>
              <PackingLineBarChart />
            </ChartCard>
            <ChartCard title="Machine Utilization Breakdown" theme={theme}>
              <PackingUtilizationDonut />
            </ChartCard>
            <ChartCard title="Daily Downtime (Packing)" theme={theme}>
              <DowntimeTimelineChart />
            </ChartCard>
            <ChartCard title="Top Downtime Causes (Pareto)" theme={theme}>
              <DowntimeParetoChart />
            </ChartCard>
            <ChartCard title="Target vs Actual Output" theme={theme}>
              <PackingBulletChart />
            </ChartCard>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;