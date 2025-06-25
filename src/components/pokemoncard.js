import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function PokemonCard({ id, name, types, image }) {
  // Capitalize name
  const displayName = 
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="pokemon-card">
      <img 
        className="pokemon-image" 
        src={image} 
        alt={name} 
        width={120} 
        height={120} 
      />
      <h2 className="pokemon-name">
        #{id} {displayName}
      </h2>
      <p className="pokemon-types">
        Type{types.length > 1 ? 's' : ''}: {types.join(', ')}
      </p>
    </div>
  );
}

PokemonCard.propTypes = {
  id:    PropTypes.number.isRequired,
  name:  PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
};
