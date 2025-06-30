// src/components/DexSelector.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function DexSelector({
  options,
  value,
  onChange
}) {
  return (
    <div className="dex-selector">
      <label htmlFor="dex">Pokédex:</label>
      <select
        id="dex"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}

DexSelector.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
