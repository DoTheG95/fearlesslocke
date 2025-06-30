// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPokedex, fetchAllTypes } from './components/FetchPokemon';
import Header from './components/Header';
import ConsoleRow from './components/ConsoleRow';
import TypeGrid from './components/TypeGrid';
import DexSelector from './components/DexSelector';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';

const dexOptions = [
  { id: '1', name: 'National' },
  { id: '2', name: 'Kanto' },
  { id: '3', name: 'Johto' },
  { id: '4', name: 'Hoenn' },
  { id: '5', name: 'Sinnoh' },
  { id: '6', name: 'Unova' },
  { id: '12', name: 'Alola' },
  { id: '27', name: 'Galar' },
  { id: '31', name: 'Paldea' }
];

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDex, setSelectedDex] = useState('1');
  const [greyedPokemon, setGreyedPokemon] = useState(() => {
    const saved = localStorage.getItem('greyedPokemon');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('greyedPokemon', JSON.stringify(greyedPokemon));
    } catch {
      // ignore quota errors
    }
  }, [greyedPokemon]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchPokedex(selectedDex), fetchAllTypes()])
      .then(([pokes, typeData]) => {
        setPokemonList(pokes);
        setTypes(typeData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedDex]);

  const handleCardClick = id => {
    setGreyedPokemon(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleTypeClick = typeName => {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) return prev.filter(t => t !== typeName);
      if (prev.length < 2) return [...prev, typeName];
      return [prev[1], typeName];
    });
  };

  const filteredList = pokemonList.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase()) &&
    selectedTypes.every(t => p.types.includes(t))
  );

  const handleResetFilters = () => {
    setFilterText('');
    setSelectedTypes([]);
  };

  const handleResetGreyed = () => {
    setGreyedPokemon([]);
  };

  if (loading) return <p>Loading Pokémon & types…</p>;
  if (error) return <p style={{ color: 'salmon' }}>Error: {error}</p>;

  return (
    <div className="App">
      <Header title="Fearless Pokémon Nuzlocke" />
      <ConsoleRow onSelectDex={setSelectedDex} />
      <TypeGrid types={types} selectedTypes={selectedTypes} onTypeClick={handleTypeClick} />
      <DexSelector options={dexOptions} value={selectedDex} onChange={setSelectedDex} />
      <SearchBar
        value={filterText}
        onChange={setFilterText}
        onResetFilters={handleResetFilters}
        onResetGreyed={handleResetGreyed}
      />
      <PokemonGrid
        pokemonList={filteredList}
        greyedPokemon={greyedPokemon}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;
