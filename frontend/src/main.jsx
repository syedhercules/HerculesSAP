// src/main.jsx
import './index.css';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ScadaProvider } from './context/ScadaContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScadaProvider>
      <App />
    </ScadaProvider>
  </React.StrictMode>
);
