import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokemonCard from './PokemonCard';
import '../App.css';

const PAGE_SIZE = 99;

export default function PokemonGrid({ pokemonList, greyedPokemon, onCardClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pokemonList.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visiblePokemon = pokemonList.slice(startIndex, startIndex + PAGE_SIZE);

  // Reset to page 1 whenever the list changes (e.g. after a search/filter)
  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonList]);

  return (
    <div>
      <div className="pokemon-grid">
        {visiblePokemon.map(p => (
          <PokemonCard
            key={p.id}
            {...p}
            active={greyedPokemon.includes(p.id)}
            onClick={() => onCardClick(p.id, p.name)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev 
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
             Next →
          </button>
        </div>
      )}
    </div>
  );
}

PokemonGrid.propTypes = {
  pokemonList:   PropTypes.array.isRequired,
  greyedPokemon: PropTypes.array.isRequired,
  onCardClick:   PropTypes.func.isRequired
};