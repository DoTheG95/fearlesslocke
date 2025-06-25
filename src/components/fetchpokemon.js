// Base URL from your .env
const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export function fetchPokemonList(id) {
  return fetch(`${API_BASE}pokemon/${id}`)
    .then(res => res.json());
}

export function fetchTypeById(id) {
  const url = `${API_BASE}type/${id}`;
    return fetch(url).then(res => {
      if (!res.ok) throw new Error(`Type ${id} fetch failed: ${res.status} ${API_BASE}`);
      return res.json();
    });
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

export function fetchAllTypes() {
  const ids = Array.from({ length: 18 }, (_, i) => i + 1);
  const promises = ids.map(id =>
    fetchTypeById(id).then(data => ({
      id:   data.id,
      name: data.name, 
      // use Sword & Shield icon—feel free to pick another gen-viii key
      icon: data.sprites['generation-viii']['sword-shield'].name_icon,
    }))
  );

  return Promise.all(promises);
}