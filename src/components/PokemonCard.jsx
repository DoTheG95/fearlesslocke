import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function AddButton({ inTeam, onAddToTeam }) {
  const [hovered, setHovered] = React.useState(false);

  const label    = inTeam ? (hovered ? '✕ Remove' : '✓ Added') : '+ Add';
  const color    = inTeam ? (hovered ? '#e05252'  : '#777')     : '#e8b84b';
  const border   = inTeam ? (hovered ? '#e05252'  : '#444')     : '#e8b84b';
  const bg       = inTeam ? (hovered ? 'rgba(224,82,82,0.12)' : 'rgba(255,255,255,0.04)') : 'rgba(232,184,75,0.15)';
  const cursor   = inTeam ? 'pointer' : 'pointer';

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        onAddToTeam();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        bottom: '6px',
        right: '6px',
        padding: '2px 8px',
        fontSize: '0.7rem',
        fontWeight: 700,
        borderRadius: '5px',
        border: `1px solid ${border}`,
        background: bg,
        color,
        cursor,
        letterSpacing: '0.03em',
        transition: 'all 0.15s',
        minWidth: '54px',
      }}
      title={inTeam ? 'Remove from team' : 'Add to team'}
    >
      {label}
    </button>
  );
}

export default function PokemonCard({
  id,
  name,
  types,
  pastTypes,
  image,
  active,
  onClick,
  showAddButton,
  inTeam,
  onAddToTeam,
}) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      className={`pokemon-card${active ? ' greyed' : ''}`}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      <img src={image} alt={displayName} />
      <h2>{displayName}</h2>
      <p>Type{types.length > 1 ? 's' : ''}: {types.join(', ')}</p>

      {pastTypes.length > 0 && (
        <ul>
          {pastTypes.map(pt => (
            <li key={pt.generation}>
              {pt.types.join(', ')}
            </li>
          ))}
        </ul>
      )}

      {showAddButton && (
        <AddButton inTeam={inTeam} onAddToTeam={onAddToTeam} />
      )}
    </div>
  );
}

PokemonCard.propTypes = {
  name:          PropTypes.string.isRequired,
  types:         PropTypes.arrayOf(PropTypes.string).isRequired,
  pastTypes:     PropTypes.arrayOf(
    PropTypes.shape({
      generation: PropTypes.string.isRequired,
      types:      PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  image:         PropTypes.string.isRequired,
  active:        PropTypes.bool,
  onClick:       PropTypes.func,
  showAddButton: PropTypes.bool,
  inTeam:        PropTypes.bool,
  onAddToTeam:   PropTypes.func,
};

PokemonCard.defaultProps = {
  pastTypes:     [],
  active:        false,
  onClick:       () => {},
  showAddButton: false,
  inTeam:        false,
  onAddToTeam:   () => {},
};