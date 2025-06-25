// src/components/TypeCard.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * TypeCard
 *
 * Shows one type’s icon and name.
 * Props:
 *  • id   – numeric type ID (unused in markup but good for keys)
 *  • name – lowercase type name
 *  • icon – URL for the Gen VIII sprite
 */
export default function TypeCard({ name, icon }) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="type-card">
      <img src={icon} alt={displayName} className="type-icon" />
      <p className="type-name">{displayName}</p>
    </div>
  );
}

TypeCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
