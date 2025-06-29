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


export async function fetchPokemonRange(startId = 1, endId = 151, batchSize = 100) {
  // Clamp endId to the real count
  const info = await fetch(`${API_BASE}pokemon?limit=1`);
  if (!info.ok) throw new Error('Could not fetch Pokémon count');
  const { count } = await info.json();
  const finalEnd = Math.min(endId, count);

  // Build the list of IDs
  const ids = Array.from(
    { length: finalEnd - startId + 1 },
    (_, i) => startId + i
  );

  const results = [];

  // Process in batches
  for (let i = 0; i < ids.length; i += batchSize) {
    const batchIds = ids.slice(i, i + batchSize);
    // Kick off batchSize parallel fetches
    const batchResults = await Promise.all(
      batchIds.map(id =>
        fetchPokemonById(id)
          .then(data => ({
            id:    data.id,
            name:  data.name,
            types: data.types.map(t => t.type.name),
            image: data.sprites.front_default,
          }))
          .catch(err => {
            console.warn(err.message);
            return null; // skip one if it fails
          })
      )
    );
    // Append only the successful ones
    results.push(...batchResults.filter(x => x));
  }
  return results;
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


export function fetchByPokedex() {

}