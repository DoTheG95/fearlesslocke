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

export default function Rules() {

  return (
    <div className='App'>
      <Header />
    </div>
  );
}
