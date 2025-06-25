import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchPokemonList } from './components/fetchpokemon';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokemonList(20).then(data => setPokemon(data.results));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Fearless Pokemon Nuzlocke
      </header>
      <ul>
        {pokemon.map(p => <li key={p.name}>{p.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
