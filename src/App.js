// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPokemonRange } from './components/fetchpokemon';
import PokemonCard from './components/pokemoncard';

function App() {
  // ─── State ────────────────────────────────────────────────
  // Holds our array of {id,name,types,image}
  const [pokemonList, setPokemonList] = useState([]);
  // Loading flag for the initial fetch
  const [loading, setLoading]       = useState(true);
  // Error message if something goes wrong
  const [error, setError]           = useState(null);

  // ─── Effect: run once on mount ────────────────────────────
  useEffect(() => {
    fetchPokemonRange(1, 151)
      .then(data => {
        setPokemonList(data);      // store array of 151 Pokémon
        setLoading(false);         // hide loading state
      })
      .catch(err => {
        console.error(err);
        setError('Could not load Pokémon.');
        setLoading(false);
      });
  }, []);

  // Conditional render
  if (loading) return <p>Loading 151 Pokémon…</p>;
  if (error)   return <p style={{ color: 'salmon' }}>Error: {error}</p>;

  // Main UI
  return (
    <div className="App">
      <header className="App-header">
        Fearless Pokémon Nuzlocke
      </header>

      <div className="pokemon-grid">
        {pokemonList.map(p => (
          // Spread our object as props: id, name, types, image
          <PokemonCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

export default App;
