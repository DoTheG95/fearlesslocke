// Base URL from your .env
const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export function fetchPokemonList(id) {
  return fetch(`${API_BASE}pokemon/${id}`)
    .then(res => res.json());
 }

export function fetchPokemonById(id) {
  const url = `${API_BASE}pokemon/${id}`;
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`Pokémon ${id} fetch failed: ${res.status}`);
    }
    return res.json();
  });
}


export function fetchPokemonRange(startId = 1, endId = 151) {
  const ids = Array.from(
    { length: endId - startId + 1 },
    (_, i) => startId + i
  );

  // Kick off one fetch per ID
  const promises = ids.map(id =>
    fetchPokemonById(id)
      .then(data => ({
        id:    data.id,
        name:  data.name,
        types: data.types.map(t => t.type.name),
        image: data.sprites.front_default,
      }))
  );

  return Promise.all(promises);
}