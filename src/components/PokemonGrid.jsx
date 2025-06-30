// src/components/PokemonGrid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import PokemonCard from './PokemonCard';
import '../App.css';

export default function PokemonGrid({
  pokemonList,
  greyedPokemon,
  onCardClick
}) {
  return (
    <div className="pokemon-grid">
      {pokemonList.map(p => (
        <PokemonCard
          key={p.id}
          {...p}
          active={greyedPokemon.includes(p.id)}
          onClick={() => onCardClick(p.id)}
        />
      ))}
    </div>
  );
}

PokemonGrid.propTypes = {
  pokemonList: PropTypes.array.isRequired,
  greyedPokemon: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired
};
