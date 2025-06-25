
export function fetchPokemonList(limit = 100, offset = 0) {
  // Base URL from your .env
  const API_BASE = process.env.REACT_APP_POKEMON_API_URL;
  return fetch(`${API_BASE}pokemon?limit=${limit}&offset=${offset}`)
    .then(res => res.json());
 }