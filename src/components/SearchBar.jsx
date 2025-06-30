// src/components/SearchBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function SearchBar({
  value,
  onChange,
  onResetFilters,
  onResetGreyed
}) {
  return (
    <div className="search-container">
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search by name…"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <button onClick={onResetFilters}>Reset</button>
        <button onClick={onResetGreyed}>Restart</button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onResetGreyed: PropTypes.func.isRequired
};
