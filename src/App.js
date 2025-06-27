// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPokemonRange, fetchAllTypes } from './components/fetchpokemon';
import PokemonCard from './components/pokemoncard';
import TypeCard from './components/pokemontypecards';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [greyedPokemon, setGreyedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCardClick = id => {
    setGreyedPokemon(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchPokemonRange(1, 1025, 200), fetchAllTypes()])
      .then(([pokemons, typeData]) => {
        setPokemonList(pokemons);
        setTypes(typeData);
      })
      .catch(err => setError(err.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading Pokémon & types…</p>;
  if (error) return <p style={{ color: 'salmon' }}>Error: {error}</p>;

  function handleTypeClick(typeName) {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) {
        // deselect if already active
        return prev.filter(t => t !== typeName);
      }
      if (prev.length < 2) {
        // add if room
        return [...prev, typeName];
      }
      // drop oldest, keep newest two
      return [prev[1], typeName];
    });
  }

  const filteredList = pokemonList.filter(pokemon => {
    // name filter (case-insensitive)
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
  
    // type filter: require *all* selectedTypes to be present
    const matchesTypes = selectedTypes.every(type =>
      pokemon.types.includes(type)
    );
  
    return matchesName && matchesTypes;
  });

  return (
    <div className="App">
      <header className="App-header">Fearless Pokémon Nuzlocke</header>
      <div className="type-grid">
        {types.map(t => <TypeCard
            key={t.id}
            {...t}
            active={selectedTypes.includes(t.name)}
            onClick={() => handleTypeClick(t.name)}
          />)}
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name…"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
      </div>
      <div className="pokemon-grid">
        {filteredList.map(p => <PokemonCard key={p.id}
            {...p}
            active={greyedPokemon.includes(p.id)}
            onClick={() => handleCardClick(p.id)}/>
          )}
      </div>
    </div>
  );
}

export default App;
