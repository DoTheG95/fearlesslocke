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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchPokemonRange(1, 151), fetchAllTypes()])
      .then(([pokemons, typeData]) => {
        setPokemonList(pokemons);
        setTypes(typeData);
      })
      .catch(err => setError(err.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading Pokémon & types…</p>;
  if (error) return <p style={{ color: 'salmon' }}>Error: {error}</p>;

  const filteredList = pokemonList.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">Fearless Pokémon Nuzlocke</header>
      <div className="type-grid">
        {types.map(t => <TypeCard key={t.id} {...t} />)}
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
        {filteredList.map(p => <PokemonCard key={p.id} {...p} />)}
      </div>
    </div>
  );
}

export default App;
