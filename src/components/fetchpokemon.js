const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

export function fetchTypeById(id) {
  const url = `${API_BASE}type/${id}`;
    return fetch(url).then(res => {
      if (!res.ok) throw new Error(`Type ${id} fetch failed: ${res.status} ${API_BASE}`);
      return res.json();
    });
}

export function fetchAllTypes() {
  const ids = Array.from({ length: 18 }, (_, i) => i + 1);
  const promises = ids.map(id =>
    fetchTypeById(id).then(data => ({
      id:   data.id,
      name: data.name,
      icon: data.sprites['generation-viii']['sword-shield'].name_icon,
    }))
  );
  return Promise.all(promises);
}


export async function fetchPokedex(id, batchSize = 100) {
  const res = await fetch(`${API_BASE}pokedex/${id}`);
  if (!res.ok) throw new Error(`Pokedex ${id} failed: ${res.status}`);
  const { pokemon_entries } = await res.json();
  const speciesUrls = pokemon_entries.map(e => e.pokemon_species.url);
  const allResults = [];

  for (let i = 0; i < speciesUrls.length; i += batchSize) {
    const batch = speciesUrls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async speciesUrl => {
        try {
          const parts = speciesUrl.split('/').filter(Boolean);
          const speciesId = parts[parts.length - 1];
          const r = await fetch(`${API_BASE}pokemon/${speciesId}`);
          if (!r.ok) throw new Error(`Pokémon #${speciesId} failed`);
          const data = await r.json();
          return {
            id:        data.id,
            name:      data.name,
            types:     data.types.map(t => t.type.name),
            pastTypes: (data.past_types || []).map(pt => ({
              generation: pt.generation.name,
              types:      pt.types.map(t => t.type.name),
            })),
            image:     data.sprites.front_default,
          };
        } catch {
          return null;
        }
      })
    );
    allResults.push(...batchResults.filter(x => x));
  }
  return allResults;
}