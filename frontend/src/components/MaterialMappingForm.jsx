import React, { useState, useEffect } from 'react';

const MaterialMappingForm = ({ onAdd, initialData }) => {
  const [form, setForm] = useState({
    material: '',
    version: '',
    scale: '',
    recipe: '',
    packingLine: '',
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      material: '',
      version: '',
      scale: '',
      recipe: '',
      packingLine: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e293b] border border-cyan-500 shadow-[0_0_15px_#00ffff44] rounded-xl p-6 text-white font-mono"
    >
      <div className="flex flex-col lg:flex-row gap-4 flex-wrap items-end">
        <input
          type="text"
          name="material"
          value={form.material}
          onChange={handleChange}
          placeholder="Material"
          className="flex-1 min-w-[150px] bg-[#0f172a] border border-cyan-500 text-cyan-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <input
          type="text"
          name="version"
          value={form.version}
          onChange={handleChange}
          placeholder="Version"
          className="flex-1 min-w-[150px] bg-[#0f172a] border border-cyan-500 text-cyan-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <input
          type="text"
          name="scale"
          value={form.scale}
          onChange={handleChange}
          placeholder="Scale"
          className="flex-1 min-w-[150px] bg-[#0f172a] border border-cyan-500 text-cyan-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="recipe"
          value={form.recipe}
          onChange={handleChange}
          placeholder="Recipe"
          className="flex-1 min-w-[150px] bg-[#0f172a] border border-cyan-500 text-cyan-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="packingLine"
          value={form.packingLine}
          onChange={handleChange}
          placeholder="Packing Line"
          className="flex-1 min-w-[150px] bg-[#0f172a] border border-cyan-500 text-cyan-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      {/* Submit Button (full width for modal) */}
      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold px-6 py-2 rounded-md shadow-lg hover:from-green-400 hover:to-teal-400 transition-all"
      >
        Add Material
      </button>
    </form>
  );
};

export default MaterialMappingForm;
