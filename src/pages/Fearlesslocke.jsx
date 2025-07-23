import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchPokedex, fetchAllTypes } from '../components/FetchPokemon';
import ConsoleRow from '../components/ConsoleRow';
import TypeGrid from '../components/TypeGrid';
import DexSelector from '../components/DexSelector';
import SearchBar from '../components/SearchBar';
import PokemonGrid from '../components/PokemonGrid';

const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export default function Fearlesslocke() {
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
  const [monolocke, setMonolocke] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('greyedPokemon', JSON.stringify(greyedPokemon));
    } catch {
      // ignore
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

  // when monolocke toggles on, ensure only one type remains selected
  useEffect(() => {
    if (monolocke) {
      setSelectedTypes(prev =>
        prev.length > 1
          ? [prev[0]]
          : prev
      );
    }
  }, [monolocke]);

  function collectSpeciesNames(chain) {
    let names = [chain.species.name];
    chain.evolves_to.forEach(child => {
      names = names.concat(collectSpeciesNames(child));
    });
    return names;
  }

  async function handleCardClick(id, name) {
    let speciesNames = [];
    try {
      const sp = await fetch(`${API_BASE}pokemon-species/${name}`);
      if (!sp.ok) throw new Error('species fetch failed');
      const spData = await sp.json();
      const ch = await fetch(spData.evolution_chain.url);
      if (!ch.ok) throw new Error('chain fetch failed');
      const chData = await ch.json();
      speciesNames = collectSpeciesNames(chData.chain);
    } catch (err) {
      console.error(err);
    }
    const chainIds = pokemonList
      .filter(p => speciesNames.includes(p.name))
      .map(p => p.id);
    setGreyedPokemon(prev => {
      const isGreyed = prev.includes(id);
      if (isGreyed) {
        return prev.filter(x => !chainIds.includes(x));
      }
      return Array.from(new Set([...prev, ...chainIds]));
    });
  }

  const handleTypeClick = typeName => {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) return prev.filter(t => t !== typeName);
      if (monolocke) return [typeName];
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
      <ConsoleRow onSelectDex={setSelectedDex} />
      <TypeGrid types={types} selectedTypes={selectedTypes} onTypeClick={handleTypeClick} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DexSelector
          options={[
            { id: '1', name: 'National' },
            { id: '2', name: 'Kanto' },
            { id: '7', name: 'Johto' },
            { id: '15', name: 'Hoenn' },
            { id: '6', name: 'Sinnoh' },
            { id: '9', name: 'Unova' },
            { id: '12', name: 'Kalos' },
            { id: '21', name: 'Alola' },
            { id: '27', name: 'Galar' },
            { id: '31', name: 'Paldea' }
          ]}
          value={selectedDex}
          onChange={setSelectedDex}
        />
        <label style={{ marginLeft: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-end' }}>
          <input
            type="checkbox"
            checked={monolocke}
            onChange={() => setMonolocke(!monolocke)}
            style={{ marginRight: '0.5rem' }}
          />
          Toggle Monolocke
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
        <SearchBar
          value={filterText}
          onChange={setFilterText}
          onResetFilters={handleResetFilters}
          onResetGreyed={handleResetGreyed}
        />
      </div>
      <PokemonGrid
        pokemonList={filteredList}
        greyedPokemon={greyedPokemon}
        onCardClick={handleCardClick}
      />
    </div>
  );
}
