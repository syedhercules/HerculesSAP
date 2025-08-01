// src/components/SyncButton.jsx
import React from 'react';

const SyncButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
    >
      Manual Sync
    </button>
  );
};

export default SyncButton;
