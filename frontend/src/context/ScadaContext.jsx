
import React, { createContext, useContext, useState } from 'react';

const ScadaContext = createContext();

export const useScada = () => useContext(ScadaContext);

export const ScadaProvider = ({ children }) => {
  const [scadaData, setScadaData] = useState({
    // Milling Inputs
    actualOutput: 36.53,
    standardCapacity: 50,
    netRunningHours: 1.5,
    totalAvailableHours: 2.5,
    plannedDowntime: 0.5,
    totalDowntime: 1,
    goodOutput: 35,
    totalOutput: 37,
    plannedOutput: 40,
    flour: 50,
    bran: 45,
    screenings: 68,
    waterUsed: 58,

    // Packing Inputs
    packingStdCapacity: 40,
    actualPackingOutput: 31.2,
    packingGoodOutput: 30,
    packingTotalOutput: 32,
    packingPlannedOutput: 35,
    packingNetHours: 1.2,
    packingTotalHours: 2.0,
  });

  return (
    <ScadaContext.Provider value={{ scadaData, setScadaData }}>
      {children}
    </ScadaContext.Provider>
  );
};
