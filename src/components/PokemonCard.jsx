import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default function PokemonCard({ id, name, types, pastTypes = [], image, active, onClick }) {
   const displayName = name.charAt(0).toUpperCase() + name.slice(1);
 
   return (
     <div
       className={`pokemon-card${active ? ' greyed' : ''}`}
       onClick={onClick}
       style={{ cursor: 'pointer' }}
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
     </div>
   );
 }
 
 PokemonCard.propTypes = {
   name:       PropTypes.string.isRequired,
   types:      PropTypes.arrayOf(PropTypes.string).isRequired,
   pastTypes:  PropTypes.arrayOf(
     PropTypes.shape({
       generation: PropTypes.string.isRequired,
       types:      PropTypes.arrayOf(PropTypes.string).isRequired,
     })
   ),
   image:      PropTypes.string.isRequired,
   active:     PropTypes.bool,
   onClick:    PropTypes.func,
 };
 
 PokemonCard.defaultProps = {
   pastTypes: [],
   active:    false,
   onClick:   () => {},
 };
 