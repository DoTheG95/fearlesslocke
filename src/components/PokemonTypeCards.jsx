// src/components/TypeCard.js
import React from 'react';
import PropTypes from 'prop-types';

export default function TypeCard({ name, icon, onClick, active }) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div
      className={`type-card${active ? ' active' : ''}`}
      onClick={onClick}               // attach the click handler
      style={{ cursor: 'pointer' }}   // show it’s clickable
    >
      <img src={icon} alt={displayName} className="type-icon" />
      <p className="type-name">{displayName}</p>
    </div>
  );
}

TypeCard.propTypes = {
  name:     PropTypes.string.isRequired,
  icon:     PropTypes.string.isRequired,
  onClick:  PropTypes.func,
  active:   PropTypes.bool,
};
TypeCard.defaultProps = {
  onClick: () => {},
  active:  false,
};
