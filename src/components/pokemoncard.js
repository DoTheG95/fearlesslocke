import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function PokemonCard({ id, name, types, image, active, onClick }) {
   const displayName = name.charAt(0).toUpperCase() + name.slice(1);
   return (
      <div
         className={`pokemon-card${active ? ' greyed' : ''}`}
         onClick={onClick}
         style={{ cursor: 'pointer' }}
      >
       <img src={image} alt={displayName} />
       <h2>{displayName}</h2>
       <p>Type{types.length>1 ? 's' : ''}: {types.join(', ')}</p>
     </div>
   );
}

PokemonCard.propTypes = {
   id:       PropTypes.number.isRequired,
   name:     PropTypes.string.isRequired,
   types:    PropTypes.arrayOf(PropTypes.string).isRequired,
   image:    PropTypes.string.isRequired,
   active:   PropTypes.bool,
   onClick:  PropTypes.func,
 };
 
 PokemonCard.defaultProps = {
   active: false,
   onClick: () => {},
 };