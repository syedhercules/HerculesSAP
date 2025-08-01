import React from 'react';
import { useScada } from '../context/ScadaContext';
import { useTheme } from '../context/ThemeContext';

const DataDisplay = ({ label, value, theme }) => (
  <div
    className={
      theme === 'light'
        ? 'flex justify-between items-center py-0.5 px-3 mb-2 rounded-md bg-blue-50 text-[#222] border border-blue-200 shadow'
        : 'flex justify-between items-center py-0.5 px-3 mb-2 rounded-md bg-[#111827] text-cyan-300 border border-cyan-500 shadow-[0_0_10px_#00ffff55]'
    }
  >
    <span className="text-sm">{label}</span>
    <span className="text-base font-bold">{parseFloat(value || 0).toFixed(2)}</span>
  </div>
);

const StatusIndicator = ({ label, theme }) => (
  <div
    className={
      theme === 'light'
        ? 'flex justify-between items-center px-3 py-0.5 mb-2 bg-green-50 text-[#222] border border-green-300 rounded-md shadow'
        : 'flex justify-between items-center px-3 py-0.5 mb-2 bg-[#0f172a] text-white border border-green-400 rounded-md shadow-[0_0_8px_#22c55e55]'
    }
  >
    <span className="text-sm">{label}</span>
    <span
      className={
        theme === 'light'
          ? 'w-4 h-4 bg-green-400 rounded-sm shadow-[0_0_6px_#86efac]'
          : 'w-4 h-4 bg-green-400 rounded-sm shadow-[0_0_6px_#22c55e]'
      }
    />
  </div>
);

const ScadaReadings = () => {
  const { scadaData } = useScada();
  const { theme } = useTheme();

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
        SCADA Readings Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Milling Panel */}
        <div
          className={
            theme === 'light'
              ? 'p-4 min-h-[620px] rounded-xl bg-white border border-blue-200 shadow flex flex-col'
              : 'p-4 min-h-[620px] rounded-xl bg-[#1e293b] border border-cyan-500 shadow-[0_0_15px_#00ffff66] flex flex-col'
          }
        >
          <h2
            className={
              theme === 'light'
                ? 'text-lg font-semibold mb-3 text-[#222]'
                : 'text-lg font-semibold mb-3 text-cyan-300'
            }
          >
            Milling Inputs
          </h2>
          <div className="flex-1">
            {[
              ['Actual Output (t)', 'actualOutput'],
              ['Standard Capacity (t)', 'standardCapacity'],
              ['Net Running Hours', 'netRunningHours'],
              ['Total Available Hours', 'totalAvailableHours'],
              ['Planned Downtime (hrs)', 'plannedDowntime'],
              ['Total Downtime (hrs)', 'totalDowntime'],
              ['Good Output (t)', 'goodOutput'],
              ['Total Output (t)', 'totalOutput'],
              ['Planned Output (t)', 'plannedOutput'],
              ['Flour (t)', 'flour'],
              ['Bran (t)', 'bran'],
              ['Screenings (t)', 'screenings'],
              ['Water Used (m³)', 'waterUsed'],
            ].map(([label, key]) => (
              <DataDisplay key={key} label={label} value={scadaData[key]} theme={theme} />
            ))}
          </div>
        </div>

        {/* Packing Panel */}
        <div
          className={
            theme === 'light'
              ? 'p-4 min-h-[620px] rounded-xl bg-white border border-blue-200 shadow flex flex-col'
              : 'p-4 min-h-[620px] rounded-xl bg-[#1e293b] border border-cyan-500 shadow-[0_0_15px_#00ffff66] flex flex-col'
          }
        >
          <h2
            className={
              theme === 'light'
                ? 'text-lg font-semibold mb-3 text-[#222]'
                : 'text-lg font-semibold mb-3 text-cyan-300'
            }
          >
            Packing Inputs
          </h2>
          <div className="flex-1">
            {[
              ['Packing Line Capacity (bags/hr)', 'packingStdCapacity'],
              ['Daily Packing Output (bags)', 'actualPackingOutput'],
              ['Packing Good Output (t)', 'packingGoodOutput'],
              ['Packing Total Output (t)', 'packingTotalOutput'],
              ['Packing Planned Output (t)', 'packingPlannedOutput'],
              ['Packing Net Hours', 'packingNetHours'],
              ['Packing Total Hours', 'packingTotalHours'],
            ].map(([label, key]) => (
              <DataDisplay key={key} label={label} value={scadaData[key]} theme={theme} />
            ))}
          </div>
        </div>

        {/* Status Panel */}
        <div
          className={
            theme === 'light'
              ? 'p-4 min-h-[620px] rounded-xl bg-white border border-green-200 shadow flex flex-col'
              : 'p-4 min-h-[620px] rounded-xl bg-[#1e293b] border border-green-500 shadow-[0_0_15px_#22c55e66] flex flex-col'
          }
        >
          <h2
            className={
              theme === 'light'
                ? 'text-lg font-semibold mb-3 text-[#222]'
                : 'text-lg font-semibold mb-3 text-green-300'
            }
          >
            System Status
          </h2>
          <div className="flex-1">
            {[
              '1BK Bin Low Level',
              '1BK Scale Enable',
              'Startup Bin Full',
              'Mill Route OK',
              'Bran Turnover',
              'Dust Filter OK',
              'Screenings Transfer',
            ].map((label, i) => (
              <StatusIndicator key={i} label={label} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScadaReadings;
